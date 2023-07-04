const { expect, test, describe } = require("@jest/globals");

const request = require("supertest");
const { Server } = require("../../src/server.js");

describe("Api E2E Test Suite", () => {
  test("GET / - Deve retornar todos os usuarios e retornar ok", async () => {
    const response = await request(Server).get("/");

    expect(response.status).toBe(200);
  });
});
