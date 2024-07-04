const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.cjs");

const should = chai.should();
chai.use(chaiHttp);

describe("GET /", () => {
  it("should return 200 status and data", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal("Hello World!");
        done();
      });
  });
});

module.exports = app;
