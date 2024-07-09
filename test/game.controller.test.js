const request = require("supertest");
const app = require("../index");

describe("Game controller", () => {
  it("should create a new game", async () => {
    const response = await request(app)
      .post("/create-game")
      .send({
        footballStadium: "Stadium A",
        gameRank: true,
        rankOfGame: "copper",
        gamePoint: 10,
      })
      .set("Authorization", `Bearer ${process.env.ACCESS_TOKEN_SECRET}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
  });
});
