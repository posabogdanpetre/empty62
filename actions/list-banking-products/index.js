const MOCK_DATA = [
  {
    name: 'PNC Cash Rewards Visa',
    description: 'Cash back credit card with category rewards on gas, dining, and groceries.',
    price: '$0 annual fee',
    category: 'Credit Card',
    image_url: 'https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid_copy_c_283020490/embeddedGrid/containergrid_copy_c_215278159/embeddedGrid/containergrid/embeddedGrid/image.coreimg.png/1778094519173/creditcard-cash-rewards-200-bonus-ribbon.png'
  },
  {
    name: 'PNC Cash Unlimited Visa Signature',
    description: 'Earn unlimited 2% cash back on every purchase with no category restrictions.',
    price: '$0 annual fee',
    category: 'Credit Card',
    image_url: 'https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid_197409_2030261130/embeddedGrid/containergrid_copy/embeddedGrid/containergrid/embeddedGrid/image.coreimg.png/1769797295149/pnc-cash-unlimited-signature.png'
  },
  {
    name: 'PNC Spend Wise Visa',
    description: 'Unlock a lower purchase APR over time as you build responsible credit habits.',
    category: 'Credit Card',
    image_url: 'https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid_1061138187/embeddedGrid/containergrid_copy/embeddedGrid/containergrid/embeddedGrid/image.coreimg.png/1724442792947/creditcard-spend-wise.png'
  },
  {
    name: 'PNC Secured Visa',
    description: 'Secured credit card to help establish and build your credit history.',
    category: 'Credit Card',
    image_url: 'https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid/embeddedGrid/containergrid_copy_c/embeddedGrid/containergrid_121507/embeddedGrid/image_copy.coreimg.png/1769797267110/creditcard-secured.png'
  }
];

module.exports = async (args) => {
  const { category } = args || {};

  // TODO: Replace MOCK_DATA with a real API call:
  // const response = await fetch(`${process.env.API_BASE_URL}/products?category=${category}`, {
  //   headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
  // });
  // const products = await response.json();

  let filtered = MOCK_DATA;

  if (category) {
    filtered = MOCK_DATA.filter(p => p.category === category);
  }

  const content = filtered.length === 0
    ? `No banking products found${category ? ` for category "${category}"` : ''}.`
    : `Found ${filtered.length} banking product${filtered.length === 1 ? '' : 's'}${category ? ` in the ${category} category` : ''}: ${filtered.map(p => p.name).join(', ')}.`;

  return {
    content,
    // structuredContent.products — derived from action name "list_banking_products" (bare array outputSchema rule)
    structuredContent: { products: filtered }
  };
};
