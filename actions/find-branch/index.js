// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'PNC Bank - Downtown Pittsburgh',
    address: '620 Liberty Avenue, Pittsburgh, PA 15222',
    phone: '(412) 762-2000',
    hours: 'Mon-Fri 9:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM',
    type: 'Branch'
  },
  {
    name: 'PNC Bank - Oakland',
    address: '3501 Forbes Avenue, Pittsburgh, PA 15213',
    phone: '(412) 681-4000',
    hours: 'Mon-Fri 9:00 AM - 6:00 PM, Sat Closed',
    type: 'Branch'
  },
  {
    name: 'PNC ATM - Market Square',
    address: '123 Market Square, Pittsburgh, PA 15222',
    phone: '',
    hours: '24/7',
    type: 'ATM'
  }
];

module.exports = async ({ zip_code = '' }) => {
  if (!zip_code || typeof zip_code !== 'string' || !zip_code.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a zip_code to search near.' }],
      // structuredContent.branches — bare array outputSchema; key derived from actionName "find_branch"
      structuredContent: { branches: [] }
    };
  }

  const query = zip_code.trim();

  // Filter MOCK_DATA — in production, this would be replaced by an API call
  const results = MOCK_DATA.filter(item => {
    // Simple mock filter: return all items for any valid zip_code
    return true;
  });

  const contentText = results.length > 0
    ? `Found ${results.length} PNC branch${results.length === 1 ? '' : 'es'} and ATM${results.length === 1 ? '' : 's'} near ${query}.`
    : `No PNC branches or ATMs found near ${query}.`;

  return {
    content: [{ type: 'text', text: contentText }],
    // structuredContent.branches — bare array outputSchema; key derived from actionName "find_branch"
    structuredContent: { branches: results }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual PNC API):
 *   GET ${process.env.API_BASE_URL}/locations?zip=${zip_code}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the PNC API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check PNC's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/locations?zip=${encodeURIComponent(zip_code)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data;
 */