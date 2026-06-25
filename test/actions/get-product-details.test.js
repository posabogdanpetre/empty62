const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ product_name: 'PNC Cash Unlimited' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ product_name: 'PNC Cash Unlimited' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('returns error message when required arg is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/product_name|provide/i);
  });

  test('"Tell me more about the PNC Cash Unlimited card" returns product details', async () => {
    const out = await handler({ product_name: 'PNC Cash Unlimited Visa Signature' });
    expect(out.structuredContent).toHaveProperty('name');
    expect(out.structuredContent).toHaveProperty('description');
    expect(out.structuredContent.name).toMatch(/PNC Cash Unlimited/i);
  });

  test('returns no results when product is not found', async () => {
    const out = await handler({ product_name: 'NonExistent Product' });
    expect(out.content[0].text).toMatch(/no product found|not found/i);
    expect(out.structuredContent).toBeUndefined();
  });

  test('matches product by partial name (case insensitive)', async () => {
    const out = await handler({ product_name: 'cash rewards' });
    expect(out.structuredContent).toHaveProperty('name');
    expect(out.structuredContent.name).toMatch(/PNC Cash Rewards/i);
  });
});