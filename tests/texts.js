import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { contactId, contactId2 } from "./contacts";
import { textMock, errorTextMock, errortextMock2 } from "./mock";

const should = chai.should();

chai.use(chaiHttp);

describe("Empty data for get all text messages", () => {
  it("should return an empty list for sent messages", done => {
    chai
      .request(app)
      .get(`/api/v1/contact/${contactId}/sent-texts`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal("Successful");
        res.body.message.should.equal("You have sent no text messages");
        done();
      });
  });

  it("should return an empty list for received messages", done => {
    chai
      .request(app)
      .get(`/api/v1/contact/${contactId}/received-texts`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal("Successful");
        res.body.message.should.equal("You have received no text messages");
        done();
      });
  });
});

describe("Send a text message", () => {
  it("should send a text to another user", done => {
    chai
      .request(app)
      .post(`/api/v1/contact/${contactId}/text`)
      .send(textMock)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal("Successful");
        done();
      });
  });

  it("should return an error that cannot send text to self", done => {
    chai
      .request(app)
      .post(`/api/v1/contact/${contactId2}/text`)
      .send(textMock)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(400);
        res.body.status.should.equal("Unsuccessful");
        res.body.message.should.equal("Can't send text message to yourself");
        done();
      });
  });

  it("should return an error that receiver's number is required", done => {
    chai
      .request(app)
      .post(`/api/v1/contact/${contactId}/text`)
      .send(errorTextMock)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.status.should.equal("Unsuccessful");
        res.body.message.should.equal("Invalid data input");
        done();
      });
  });

  it("should return an error that cannot find receiver's phone number", done => {
    chai
      .request(app)
      .post(`/api/v1/contact/${contactId}/text`)
      .send(errortextMock2)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.status.should.equal("Unsuccessful");
        res.body.message.should.equal(
          "The receiver's phone number entered does not exist"
        );
        done();
      });
  });

  it("should return an error that contact is not registered", done => {
    chai
      .request(app)
      .post(`/api/v1/contact/20/text`)
      .send(textMock)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.status.should.equal("Unsuccessful");
        res.body.message.should.equal("You are not registered to send sms");
        done();
      });
  });
});

describe("Get all sent text messages", () => {
  it("should return a list of sent messages for a specific contact", done => {
    chai
      .request(app)
      .get(`/api/v1/contact/${contactId}/sent-texts`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal("Successful");
        done();
      });
  });

  it("should return an error that contact does not exist", done => {
    chai
      .request(app)
      .get(`/api/v1/contact/21/sent-texts`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal("Unsuccessful");
        res.body.message.should.equal("Contact does not exist");
        done();
      });
  });
});

describe("Get all received text messages", () => {
  it("should return a list of received messages for a specific contact", done => {
    chai
      .request(app)
      .get(`/api/v1/contact/${contactId2}/received-texts`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal("Successful");
        done();
      });
  });

  it("should return an error that contact does not exist", done => {
    chai
      .request(app)
      .get(`/api/v1/contact/21/received-texts`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal("Unsuccessful");
        res.body.message.should.equal("Contact does not exist");
        done();
      });
  });
});
