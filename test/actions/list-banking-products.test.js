const listBankingProducts = require('../../actions/list-banking-products/index.js');

describe('list-banking-products action', () => {
  test('returns all products when no category filter is provided', async () => {
    const result = await listBankingProducts({});
    
    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('structuredContent');
    expect(result.structuredContent).toHaveProperty('products');
    expect(Array.isArray(result.structuredContent.products)).toBe(true);
    expect(result.structuredContent.products.length).toBe(4);
    expect(result.content).toContain('Found 4 banking products');
  });

  test('filters products by category', async () => {
    const result = await listBankingProducts({ category: 'Credit Card' });
    
    expect(result.structuredContent.products.length).toBe(4);
    expect(result.structuredContent.products.every(p => p.category === 'Credit Card')).toBe(true);
    expect(result.content).toContain('Credit Card');
  });

  test('returns empty array for category with no matches', async () => {
    const result = await listBankingProducts({ category: 'Mortgage' });
    
    expect(result.structuredContent.products.length).toBe(0);
    expect(result.content).toContain('No banking products found for category "Mortgage"');
  });

  test('each product has required fields', async () => {
    const result = await listBankingProducts({});
    const product = result.structuredContent.products[0];
    
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('image_url');
  });
});
