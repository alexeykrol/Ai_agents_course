export const handler = async (event, context) => {
  console.log('Function called with method:', event.httpMethod);
  console.log('Environment check:', {
    hasBaseId: !!process.env.AIRTABLE_BASE_ID,
    hasTableId: !!process.env.AIRTABLE_TABLE_ID,
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    baseIdLength: process.env.AIRTABLE_BASE_ID?.length,
    tableIdLength: process.env.AIRTABLE_TABLE_ID?.length,
    apiKeyLength: process.env.AIRTABLE_API_KEY?.length
  });

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  // Check if environment variables are set
  if (!process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_TABLE_ID || !process.env.AIRTABLE_API_KEY) {
    console.error('Missing environment variables:', {
      AIRTABLE_BASE_ID: !!process.env.AIRTABLE_BASE_ID,
      AIRTABLE_TABLE_ID: !!process.env.AIRTABLE_TABLE_ID,
      AIRTABLE_API_KEY: !!process.env.AIRTABLE_API_KEY
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Airtable configuration missing',
        details: {
          hasBaseId: !!process.env.AIRTABLE_BASE_ID,
          hasTableId: !!process.env.AIRTABLE_TABLE_ID,
          hasApiKey: !!process.env.AIRTABLE_API_KEY
        }
      })
    };
  }

  const AIRTABLE_CONFIG = {
    baseId: process.env.AIRTABLE_BASE_ID,
    tableId: process.env.AIRTABLE_TABLE_ID,
    apiKey: process.env.AIRTABLE_API_KEY
  };

  console.log('Airtable config (masked):', {
    baseId: AIRTABLE_CONFIG.baseId?.substring(0, 8) + '...',
    tableId: AIRTABLE_CONFIG.tableId,
    apiKeyPrefix: AIRTABLE_CONFIG.apiKey?.substring(0, 8) + '...'
  });

  try {
    const { httpMethod, body } = event;

    if (httpMethod === 'GET') {
      console.log('Making GET request to Airtable...');
      
      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tableId)}?sort%5B0%5D%5Bfield%5D=Created&sort%5B0%5D%5Bdirection%5D=desc&maxRecords=1`;
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
    }

    if (httpMethod === 'POST') {
      console.log('Making POST request to Airtable...');
      
      const requestData = JSON.parse(body);
      console.log('Request data:', requestData);
      
      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tableId)}`;
      
      const postBody = {
        records: [{
          fields: {
            variable_1: requestData.variable_1,
            variable_2: requestData.variable_2
          }
        }]
      };
      
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