const { test, expect } = require('@playwright/test');

test('Backend Test - Auth EP is up', {
  tag: ['@ProjectName', '@Tests', '@API', '@BackendTest']
}, async ({ request }) => {
  const response = await request.get(`/new`);

  // Assertion
  expect(response.status()).toBe(200);
});

test('Backend Test - Create data', {
  tag: ['@ProjectName', '@Tests', '@AuthUser', '@Login', '@API', '@BackendTest'] }, async ({ request }) => {
  const response = await request.post("/", {
    title: "hi",
    description: "test"
  });

  // Assertion
  expect(response.status()).toBe(200);
});

test('Backend Test - Delete data', {
  tag: ['@ProjectName', '@Tests', '@API', '@BackendTest'] }, async ({ request }) => {
  const response = await request.post("/", {
    title: "hi",
    description: "test"
  });

  // Assertion
  expect(response.status()).toBe(200);
});

// await Note.findByIdAndRemove(req.params.id);

