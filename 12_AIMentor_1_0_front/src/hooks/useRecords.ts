import { useState, useEffect, useCallback } from 'react';
import { AgentRecord, EditableFields, NewAgentFields } from '../types';
import { apiService } from '../services/api';
import { useAuth } from './useAuth';

export function useRecords() {
  const { isAuthenticated } = useAuth();
  const [records, setRecords] = useState<AgentRecord[]>([]);
  const [activeRecord, setActiveRecord] = useState<AgentRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCreatedRecordId, setLastCreatedRecordId] = useState<string | null>(null);
  const [lastActionType, setLastActionType] = useState<'edit' | 'create' | null>(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await apiService.getRecords();
    
    if (result.success && result.data) {
      setRecords(result.data);
      if (result.data.length > 0 && !activeRecord) {
        setActiveRecord(result.data[0]);
      }
    } else {
      setError(result.error || 'Failed to fetch records');
    }
    
    setLoading(false);
  }, [activeRecord]);

  const fetchRecord = useCallback(async (id: string) => {
    const result = await apiService.getRecord(id);
    
    if (result.success && result.data) {
      setActiveRecord(result.data);
    } else {
      setError(result.error || 'Failed to fetch record details');
    }
  }, []);

  const selectRecord = useCallback((record: AgentRecord) => {
    setActiveRecord(record);
    setIsEditing(false);
    // Clear undo state when selecting a different record
    setLastCreatedRecordId(null);
    setLastActionType(null);
  }, []);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    setIsCreatingNew(false);
    // Clear undo state when starting to edit
    setLastCreatedRecordId(null);
    setLastActionType(null);
  }, []);

  const startCreatingNew = useCallback(() => {
    setIsCreatingNew(true);
    setIsEditing(false);
    setActiveRecord(null);
    // Clear undo state when creating new
    setLastCreatedRecordId(null);
    setLastActionType(null);
  }, []);

  const cancelCreatingNew = useCallback(() => {
    setIsCreatingNew(false);
    if (records.length > 0) {
      setActiveRecord(records[0]);
    }
    // Clear undo state when canceling
    setLastCreatedRecordId(null);
    setLastActionType(null);
  }, [records]);

  const saveRecord = useCallback(async (fields: EditableFields) => {
    if (!activeRecord) return;

    setLoading(true);
    setError(null);

    const result = await apiService.createRecord('', fields); // p2_id will be generated automatically

    if (result.success && result.data) {
      const newRecord = result.data;
      // Replace the old version with the new version in the records list (same agent name)
      setRecords(prev => {
        const filtered = prev.filter(r => r.p2_wf_name !== activeRecord.p2_wf_name);
        return [newRecord, ...filtered];
      });
      setActiveRecord(newRecord);
      setIsEditing(false);
      setLastCreatedRecordId(newRecord.id);
      setLastActionType('edit');
    } else {
      setError(result.error || 'Failed to save record');
    }

    setLoading(false);
  }, [activeRecord]);

  const createNewAgent = useCallback(async (fields: NewAgentFields) => {
    setLoading(true);
    setError(null);

    const result = await apiService.createNewAgent(fields);

    if (result.success && result.data) {
      const newRecord = result.data;
      setRecords(prev => [newRecord, ...prev]);
      setActiveRecord(newRecord);
      setIsCreatingNew(false);
      setLastCreatedRecordId(newRecord.id);
      setLastActionType('create');
    } else {
      setError(result.error || 'Failed to create new agent');
    }

    setLoading(false);
  }, []);

  const undoLastChange = useCallback(async () => {
    if (!lastCreatedRecordId) return;

    setLoading(true);
    setError(null);

    const result = await apiService.deleteRecord(lastCreatedRecordId);

    if (result.success) {
      // After undo, we need to refresh the records to get the previous version
      await fetchRecords();
      setLastCreatedRecordId(null);
      setLastActionType(null);
    } else {
      setError(result.error || 'Failed to undo changes');
    }

    setLoading(false);
  }, [lastCreatedRecordId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRecords();
    } else {
      // Clear records when user logs out
      setRecords([]);
      setActiveRecord(null);
      setIsEditing(false);
      setIsCreatingNew(false);
      setLastCreatedRecordId(null);
      setLastActionType(null);
    }
  }, [isAuthenticated, fetchRecords]);

  return {
    records,
    activeRecord,
    isEditing,
    isCreatingNew,
    loading,
    error,
    canUndo: Boolean(lastCreatedRecordId && lastActionType === 'edit'),
    selectRecord,
    startEditing,
    startCreatingNew,
    cancelCreatingNew,
    saveRecord,
    createNewAgent,
    undoLastChange,
    fetchRecords,
    clearError
  };
}