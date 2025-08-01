export interface AirtableRecord {
  id: string;
  p2_wf_name: string;
  p2_wf_version: string;
  p2_id: string;
  p2_variable_1: string;
  p2_variable_2: string;
  p2_variable_3: string;
  p2_variable_4: string;
  createdTime: string;
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