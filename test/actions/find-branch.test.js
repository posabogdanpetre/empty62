const handler = require('../../actions/find-branch/index.js');

describe('find_branch handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ zip_code: '15222' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ zip_code: '15222' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.branches is an array', async () => {
    const out = await handler({ zip_code: '15222' });
    expect(Array.isArray(out.structuredContent.branches)).toBe(true);
  });

  test('returns error message when zip_code is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/zip_code|provide/i);
  });

  test('returns error message when zip_code is empty string', async () => {
    const out = await handler({ zip_code: '' });
    expect(out.content[0].text).toMatch(/zip_code|provide/i);
  });

  test('"Find a PNC branch near me" returns branch locations', async () => {
    const out = await handler({ zip_code: '15222' });
    expect(out.structuredContent.branches.length).toBeGreaterThan(0);
    expect(out.content[0].text).toMatch(/Found \d+ PNC/i);
  });

  test('returns branches with expected shape', async () => {
    const out = await handler({ zip_code: '15222' });
    const branches = out.structuredContent.branches;
    expect(branches.length).toBeGreaterThan(0);
    const branch = branches[0];
    expect(branch).toHaveProperty('name');
    expect(branch).toHaveProperty('address');
    expect(branch).toHaveProperty('phone');
    expect(branch).toHaveProperty('hours');
  });
});