// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    "name": "PNC Cash Rewards Visa",
    "description": "Cash back credit card with category rewards on gas, dining, and groceries.",
    "price": "$0 annual fee",
    "category": "Credit Card",
    "image_url": "https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid_copy_c_283020490/embeddedGrid/containergrid_copy_c_215278159/embeddedGrid/containergrid/embeddedGrid/image.coreimg.png/1778094519173/creditcard-cash-rewards-200-bonus-ribbon.png"
  },
  {
    "name": "PNC Cash Unlimited Visa Signature",
    "description": "Earn unlimited 2% cash back on every purchase with no category restrictions.",
    "price": "$0 annual fee",
    "category": "Credit Card",
    "image_url": "https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid_197409_2030261130/embeddedGrid/containergrid_copy/embeddedGrid/containergrid/embeddedGrid/image.coreimg.png/1769797295149/pnc-cash-unlimited-signature.png"
  },
  {
    "name": "PNC Spend Wise Visa",
    "description": "Unlock a lower purchase APR over time as you build responsible credit habits.",
    "category": "Credit Card",
    "image_url": "https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid_1061138187/embeddedGrid/containergrid_copy/embeddedGrid/containergrid/embeddedGrid/image.coreimg.png/1724442792947/creditcard-spend-wise.png"
  },
  {
    "name": "PNC Secured Visa",
    "description": "Secured credit card to help establish and build your credit history.",
    "category": "Credit Card",
    "image_url": "https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid/embeddedGrid/containergrid_copy_c/embeddedGrid/containergrid_121507/embeddedGrid/image_copy.coreimg.png/1769797267110/creditcard-secured.png"
  }
];

module.exports = async ({ product_name = '' }) => {
  if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }]
    };
  }

  const query = product_name.trim();
  const item = MOCK_DATA.find(p => 
    p.name.toLowerCase() === query.toLowerCase() || 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!item) {
    return {
      content: [{ type: 'text', text: `No product found matching: ${product_name}` }]
    };
  }

  return {
    content: [{ 
      type: 'text', 
      text: `Found ${item.name}: ${item.description} - ${item.price}` 
    }],
    // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
    structuredContent: { ...item }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products/${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data;
 */