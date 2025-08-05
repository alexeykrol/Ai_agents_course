import { supabase } from '../lib/supabase';
import { AgentRecord, EditableFields, NewAgentFields, ApiResponse } from '../types';

export class ApiService {
  // Helper function to parse semver and compare versions
  private parseVersion(version: string) {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (match) {
      return {
        major: parseInt(match[1]),
        minor: parseInt(match[2]),
        patch: parseInt(match[3]),
        valid: true
      };
    }
    return { major: 1, minor: 0, patch: 0, valid: false };
  }

  private compareVersions(a: string, b: string) {
    const vA = this.parseVersion(a);
    const vB = this.parseVersion(b);
    
    if (vA.major !== vB.major) return vB.major - vA.major;
    if (vA.minor !== vB.minor) return vB.minor - vA.minor;
    return vB.patch - vA.patch;
  }

  // Helper function to generate next version with proper semver
  private generateNextVersion(currentVersion: string) {
    const parsed = this.parseVersion(currentVersion);
    if (parsed.valid) {
      return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
    }
    
    // Fallback for non-semver versions
    const numMatch = currentVersion.match(/(\d+)/);
    if (numMatch) {
      return `${parseInt(numMatch[1]) + 1}.0.0`;
    }
    
    return '1.0.1';
  }

  async getRecords(): Promise<ApiResponse<AgentRecord[]>> {
    try {
      console.log('=== API GET RECORDS ===');
      
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        return {
          success: false,
          error: `Database error: ${error.message}`,
        };
      }

      // Group by p2_wf_name and keep only latest version
      const latestVersionsMap = new Map<string, AgentRecord>();
      data?.forEach(record => {
        const existingRecord = latestVersionsMap.get(record.p2_wf_name);
        if (!existingRecord || new Date(record.created_at) > new Date(existingRecord.created_at)) {
          latestVersionsMap.set(record.p2_wf_name, record);
        }
      });
      
      const finalRecords = Array.from(latestVersionsMap.values())
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      console.log('API Success:', finalRecords.length, 'records');
      return {
        success: true,
        data: finalRecords,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async getRecord(id: string): Promise<ApiResponse<AgentRecord>> {
    try {
      console.log('=== API GET RECORD ===', id);
      
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Database error:', error);
        return {
          success: false,
          error: `Database error: ${error.message}`,
        };
      }

      console.log('API Success:', data);
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async createRecord(p2_id: string, fields: EditableFields): Promise<ApiResponse<AgentRecord>> {
    try {
      console.log('=== API CREATE RECORD ===', fields);

      // Get all records with the same name to determine next version
      const { data: existingRecords, error: fetchError } = await supabase
        .from('agents')
        .select('p2_wf_version')
        .eq('p2_wf_name', fields.p2_wf_name)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching existing records:', fetchError);
        return {
          success: false,
          error: `Database error: ${fetchError.message}`,
        };
      }

      // Determine next version
      let nextVersion = '1.0.0';
      if (existingRecords && existingRecords.length > 0) {
        const versions = existingRecords.map(r => r.p2_wf_version).sort(this.compareVersions);
        const latestVersion = versions[0] || '1.0.0';
        nextVersion = this.generateNextVersion(latestVersion);
      }

      // Generate new p2_id
      const newP2Id = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const { data, error } = await supabase
        .from('agents')
        .insert({
          p2_wf_name: fields.p2_wf_name,
          p2_wf_version: nextVersion,
          p2_id: newP2Id,
          p2_variable_1: fields.p2_variable_1,
          p2_variable_2: fields.p2_variable_2,
          p2_variable_3: fields.p2_variable_3,
          p2_variable_4: fields.p2_variable_4,
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return {
          success: false,
          error: `Database error: ${error.message}`,
        };
      }

      console.log('API Success:', data);
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async deleteRecord(id: string): Promise<ApiResponse<void>> {
    try {
      console.log('=== API DELETE RECORD ===', id);
      
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Database error:', error);
        return {
          success: false,
          error: `Database error: ${error.message}`,
        };
      }

      console.log('API Success: Record deleted');
      return {
        success: true,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async createNewAgent(fields: NewAgentFields): Promise<ApiResponse<AgentRecord>> {
    try {
      console.log('=== API CREATE NEW AGENT ===', fields);

      // Generate new p2_id
      const newP2Id = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const { data, error } = await supabase
        .from('agents')
        .insert({
          p2_wf_name: fields.p2_wf_name,
          p2_wf_version: '1.0.0',
          p2_id: newP2Id,
          p2_variable_1: fields.p2_variable_1,
          p2_variable_2: fields.p2_variable_2,
          p2_variable_3: fields.p2_variable_3,
          p2_variable_4: fields.p2_variable_4,
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return {
          success: false,
          error: `Database error: ${error.message}`,
        };
      }

      console.log('API Success:', data);
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export const apiService = new ApiService();