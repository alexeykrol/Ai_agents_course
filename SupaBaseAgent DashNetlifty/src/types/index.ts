export interface AgentRecord {
  id: string;
  p2_wf_name: string;
  p2_wf_version: string;
  p2_id: string;
  p2_variable_1: string;
  p2_variable_2: string;
  p2_variable_3: string;
  p2_variable_4: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface EditableFields {
  p2_wf_name: string;
  p2_variable_1: string;
  p2_variable_2: string;
  p2_variable_3: string;
  p2_variable_4: string;
}

export interface NewAgentFields {
  p2_wf_name: string;
  p2_variable_1: string;
  p2_variable_2: string;
  p2_variable_3: string;
  p2_variable_4: string;
}

// Keep old interface for backward compatibility during migration
export interface AirtableRecord extends AgentRecord {
  createdTime: string;
}