export const handler = async (event, context) => {
  console.log('Function called with method:', event.httpMethod);
  console.log('Path:', event.path);
  console.log('All environment variables:', Object.keys(process.env));
  console.log('Environment check:', {
    hasBaseId: !!process.env.AIRTABLE_BASE_ID,
    hasTableId: !!process.env.AIRTABLE_TABLE_ID,
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    baseIdLength: process.env.AIRTABLE_BASE_ID?.length,
    tableIdLength: process.env.AIRTABLE_TABLE_ID?.length,
    apiKeyLength: process.env.AIRTABLE_API_KEY?.length,
    // Try alternative variable names
    hasAltBaseId: !!process.env.VITE_AIRTABLE_BASE_ID,
    hasAltTableId: !!process.env.VITE_AIRTABLE_TABLE_ID,
    hasAltApiKey: !!process.env.VITE_AIRTABLE_API_KEY
  });

  // CORS headers - расширенные для всех возможных заголовков
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Airtable-Meta',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PATCH, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  // Try to get environment variables with fallbacks
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.VITE_AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || process.env.VITE_AIRTABLE_TABLE_ID;
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.VITE_AIRTABLE_API_KEY;

  // Check if environment variables are set
  if (!AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID || !AIRTABLE_API_KEY) {
    console.error('Missing environment variables:', {
      AIRTABLE_BASE_ID: !!AIRTABLE_BASE_ID,
      AIRTABLE_TABLE_ID: !!AIRTABLE_TABLE_ID,
      AIRTABLE_API_KEY: !!AIRTABLE_API_KEY,
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('AIRTABLE'))
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Airtable configuration missing',
        details: {
          hasBaseId: !!AIRTABLE_BASE_ID,
          hasTableId: !!AIRTABLE_TABLE_ID,
          hasApiKey: !!AIRTABLE_API_KEY,
          availableAirtableVars: Object.keys(process.env).filter(key => key.includes('AIRTABLE'))
        }
      })
    };
  }

  const AIRTABLE_CONFIG = {
    baseId: AIRTABLE_BASE_ID,
    tableId: AIRTABLE_TABLE_ID,
    apiKey: AIRTABLE_API_KEY
  };

  console.log('Airtable config (masked):', {
    baseId: AIRTABLE_CONFIG.baseId?.substring(0, 8) + '...',
    tableId: AIRTABLE_CONFIG.tableId,
    apiKeyPrefix: AIRTABLE_CONFIG.apiKey?.substring(0, 8) + '...'
  });

  // Helper function to parse semver and compare versions
  const parseVersion = (version) => {
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
  };

  const compareVersions = (a, b) => {
    const vA = parseVersion(a);
    const vB = parseVersion(b);
    
    if (vA.major !== vB.major) return vB.major - vA.major;
    if (vA.minor !== vB.minor) return vB.minor - vA.minor;
    return vB.patch - vA.patch;
  };

  // Helper function to generate next version with proper semver
  const generateNextVersion = (currentVersion) => {
    const parsed = parseVersion(currentVersion);
    if (parsed.valid) {
      return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
    }
    
    // Fallback for non-semver versions
    const numMatch = currentVersion.match(/(\d+)/);
    if (numMatch) {
      return `${parseInt(numMatch[1]) + 1}.0.0`;
    }
    
    return '1.0.1';
  };

  // Helper function to identify Airtable record ID
  const isAirtableRecordId = (id) => {
    return /^rec[A-Za-z0-9]{14}$/.test(id);
  };

  // Helper function to get all records with pagination
  const getAllRecords = async (baseUrl) => {
    let allRecords = [];
    let offset = null;
    
    do {
      const url = offset 
        ? `${baseUrl}?offset=${offset}&sort%5B0%5D%5Bfield%5D=Created&sort%5B0%5D%5Bdirection%5D=desc`
        : `${baseUrl}?sort%5B0%5D%5Bfield%5D=Created&sort%5B0%5D%5Bdirection%5D=desc`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status}`);
      }

      const data = await response.json();
      allRecords = allRecords.concat(data.records || []);
      offset = data.offset;
    } while (offset);

    return allRecords;
  };

  try {
    const { httpMethod, body, path } = event;
    const pathParts = path.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    const recordId = isAirtableRecordId(lastPart) ? lastPart : null;

    if (httpMethod === 'GET') {
      console.log('Making GET request to Airtable...');
      
      const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tableId)}`;
      
      if (recordId) {
        console.log('Getting specific record:', recordId);
        
        const airtableUrl = `${baseUrl}/${recordId}`;
        console.log('Airtable URL:', airtableUrl);
        
        const response = await fetch(airtableUrl, {
          headers: {
            'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Airtable response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Airtable API error:', response.status, errorText);
          
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
              error: `Airtable API error: ${response.status}`,
              details: errorText
            })
          };
        }

        const data = await response.json();
        console.log('Airtable response data:', JSON.stringify(data, null, 2));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data)
        };
      } else {
        // Get all records with pagination
        console.log('Getting all records with pagination...');
        
        const allRecords = await getAllRecords(baseUrl);
        console.log(`Retrieved ${allRecords.length} total records`);
        
        const data = { records: allRecords };
        console.log('Airtable response data:', JSON.stringify(data, null, 2));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data)
        };
      }
    }

    if (httpMethod === 'POST') {
      console.log('Making POST request to Airtable...');
      
      const requestData = JSON.parse(body);
      const { fields = {}, isNewAgent = false } = requestData;
      console.log('Request data:', { fields, isNewAgent });
      
      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tableId)}`;
      
      let postBody;
      
      if (isNewAgent) {
        // Creating completely new agent
        const newP2Id = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        postBody = {
          records: [{
            fields: {
              p2_wf_name: fields.p2_wf_name || '',
              p2_wf_version: '1.0.0',
              p2_id: newP2Id,
              p2_variable_1: fields.p2_variable_1 || '',
              p2_variable_2: fields.p2_variable_2 || '',
              p2_variable_3: fields.p2_variable_3 || '',
              p2_variable_4: fields.p2_variable_4 || ''
            }
          }]
        };
      } else {
        // Creating new version of existing agent
        console.log('Getting all records to determine next version...');
        
        const allRecords = await getAllRecords(airtableUrl);
        const sameNameRecords = allRecords
          .filter(record => record.fields.p2_wf_name === fields.p2_wf_name)
          .sort((a, b) => compareVersions(a.fields.p2_wf_version || '1.0.0', b.fields.p2_wf_version || '1.0.0'));
        
        let nextVersion = '1.0.0';
        if (sameNameRecords.length > 0) {
          const latestVersion = sameNameRecords[0].fields.p2_wf_version || '1.0.0';
          nextVersion = generateNextVersion(latestVersion);
        }

        const newP2Id = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        postBody = {
          records: [{
            fields: {
              p2_wf_name: fields.p2_wf_name || '',
              p2_wf_version: nextVersion,
              p2_id: newP2Id,
              p2_variable_1: fields.p2_variable_1 || '',
              p2_variable_2: fields.p2_variable_2 || '',
              p2_variable_3: fields.p2_variable_3 || '',
              p2_variable_4: fields.p2_variable_4 || ''
            }
          }]
        };
      }
      
      console.log('POST body:', JSON.stringify(postBody, null, 2));
      
      const response = await fetch(airtableUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
      });

      console.log('POST response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Airtable POST error:', response.status, errorText);
        
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: `Airtable API error: ${response.status}`,
            details: errorText
          })
        };
      }

      const data = await response.json();
      console.log('POST response data:', JSON.stringify(data, null, 2));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    if (httpMethod === 'PATCH') {
      console.log('Making PATCH request to Airtable...');
      
      if (!recordId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Record ID is required for PATCH' })
        };
      }

      const requestData = JSON.parse(body);
      const { fields = {} } = requestData;
      console.log('PATCH request data:', { recordId, fields });
      
      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tableId)}/${recordId}`;
      
      const patchBody = {
        fields: {
          p2_wf_name: fields.p2_wf_name,
          p2_variable_1: fields.p2_variable_1,
          p2_variable_2: fields.p2_variable_2,
          p2_variable_3: fields.p2_variable_3,
          p2_variable_4: fields.p2_variable_4
        }
      };
      
      console.log('PATCH body:', JSON.stringify(patchBody, null, 2));
      
      const response = await fetch(airtableUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patchBody)
      });

      console.log('PATCH response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Airtable PATCH error:', response.status, errorText);
        
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: `Airtable API error: ${response.status}`,
            details: errorText
          })
        };
      }

      const data = await response.json();
      console.log('PATCH response data:', JSON.stringify(data, null, 2));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    if (httpMethod === 'DELETE') {
      console.log('Making DELETE request to Airtable...');
      
      if (!recordId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Record ID is required for DELETE' })
        };
      }
      
      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tableId)}/${recordId}`;
      console.log('DELETE URL:', airtableUrl);
      
      const response = await fetch(airtableUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('DELETE response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Airtable DELETE error:', response.status, errorText);
        
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: `Airtable API error: ${response.status}`,
            details: errorText
          })
        };
      }

      const data = await response.json();
      console.log('DELETE response data:', JSON.stringify(data, null, 2));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack
      })
    };
  }
}