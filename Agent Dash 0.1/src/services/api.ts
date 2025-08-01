import { AirtableRecord, EditableFields, NewAgentFields, ApiResponse } from '../types';

export class ApiService {
  private baseUrl = '/.netlify/functions/airtable-api';

  private async makeRequest<T>(endpoint: string = '', options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      console.log('=== API REQUEST ===');
      console.log('URL:', url);
      console.log('Method:', options.method || 'GET');
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        return {
          success: false,
          error: `API error: ${response.status} - ${errorText}`,
        };
      }

      const result = await response.json();
      console.log('Success response:', result);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.log('Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async getRecords(): Promise<ApiResponse<AirtableRecord[]>> {
    const response = await this.makeRequest<any>('');
    
    if (response.success && response.data && response.data.records) {
      const transformedRecords = response.data.records.map((record: any) => ({
        id: record.id,
        p2_wf_name: record.fields.p2_wf_name || '',
        p2_wf_version: record.fields.p2_wf_version || '',
        p2_id: record.fields.p2_id || '',
        p2_variable_1: record.fields.p2_variable_1 || '',
        p2_variable_2: record.fields.p2_variable_2 || '',
        p2_variable_3: record.fields.p2_variable_3 || '',
        p2_variable_4: record.fields.p2_variable_4 || '',
        createdTime: record.createdTime,
      }));

      // Group by p2_wf_name and keep only latest version
      const latestVersionsMap = new Map<string, AirtableRecord>();
      transformedRecords.forEach(record => {
        const existingRecord = latestVersionsMap.get(record.p2_wf_name);
        if (!existingRecord || new Date(record.createdTime) > new Date(existingRecord.createdTime)) {
          latestVersionsMap.set(record.p2_wf_name, record);
        }
      });
      
      const finalRecords = Array.from(latestVersionsMap.values())
        .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
      
      return {
        success: true,
        data: finalRecords,
      };
    }
    
    return response;
  }

  async getRecord(id: string): Promise<ApiResponse<AirtableRecord>> {
    const response = await this.makeRequest<any>(`/${id}`);
    
    if (response.success && response.data) {
      const transformedRecord = {
        id: response.data.id,
        p2_wf_name: response.data.fields.p2_wf_name || '',
        p2_wf_version: response.data.fields.p2_wf_version || '',
        p2_id: response.data.fields.p2_id || '',
        p2_variable_1: response.data.fields.p2_variable_1 || '',
        p2_variable_2: response.data.fields.p2_variable_2 || '',
        p2_variable_3: response.data.fields.p2_variable_3 || '',
        p2_variable_4: response.data.fields.p2_variable_4 || '',
        createdTime: response.data.createdTime,
      };
      
      return {
        success: true,
        data: transformedRecord,
      };
    }
    
    return response;
  }

  async createRecord(p2_id: string, fields: EditableFields): Promise<ApiResponse<AirtableRecord>> {
    const response = await this.makeRequest<any>('', {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          p2_wf_name: fields.p2_wf_name,
          p2_variable_1: fields.p2_variable_1,
          p2_variable_2: fields.p2_variable_2,
          p2_variable_3: fields.p2_variable_3,
          p2_variable_4: fields.p2_variable_4,
        },
        isNewAgent: false
      }),
    });

    if (response.success && response.data && response.data.records && response.data.records[0]) {
      const record = response.data.records[0];
      const transformedRecord = {
        id: record.id,
        p2_wf_name: record.fields.p2_wf_name || '',
        p2_wf_version: record.fields.p2_wf_version || '',
        p2_id: record.fields.p2_id || '',
        p2_variable_1: record.fields.p2_variable_1 || '',
        p2_variable_2: record.fields.p2_variable_2 || '',
        p2_variable_3: record.fields.p2_variable_3 || '',
        p2_variable_4: record.fields.p2_variable_4 || '',
        createdTime: record.createdTime,
      };
      
      return {
        success: true,
        data: transformedRecord,
      };
    }

    return response;
  }

  async deleteRecord(id: string): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/${id}`, {
      method: 'DELETE',
    });
  }

  async createNewAgent(fields: NewAgentFields): Promise<ApiResponse<AirtableRecord>> {
    const response = await this.makeRequest<any>('', {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          p2_wf_name: fields.p2_wf_name,
          p2_variable_1: fields.p2_variable_1,
          p2_variable_2: fields.p2_variable_2,
          p2_variable_3: fields.p2_variable_3,
          p2_variable_4: fields.p2_variable_4,
        },
        isNewAgent: true
      }),
    });

    if (response.success && response.data && response.data.records && response.data.records[0]) {
      const record = response.data.records[0];
      const transformedRecord = {
        id: record.id,
        p2_wf_name: record.fields.p2_wf_name || '',
        p2_wf_version: record.fields.p2_wf_version || '',
        p2_id: record.fields.p2_id || '',
        p2_variable_1: record.fields.p2_variable_1 || '',
        p2_variable_2: record.fields.p2_variable_2 || '',
        p2_variable_3: record.fields.p2_variable_3 || '',
        p2_variable_4: record.fields.p2_variable_4 || '',
        createdTime: record.createdTime,
      };
      
      return {
        success: true,
        data: transformedRecord,
      };
    }

    return response;
  }
}

export const apiService = new ApiService();