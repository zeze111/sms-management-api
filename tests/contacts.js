import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import {
  contactMock,
  contactMock2,
  errorContactMock,
  contactMock3
} from "./mock";

const should = chai.should();

chai.use(chaiHttp);

export let contactId;
export let contactId2;
let contactId3;

describe("Empty data for get all contacts", () => {
  it("it should return an empty list", done => {
    chai
      .request(app)
      .get("/api/v1/contacts")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal("Successful");
        res.body.message.should.equal("There Are Currently No Contacts");
        done();
      });
  });
});

describe("Create contact", () => {
  it("should create a new contact", done => {
    chai
      .request(app)
      .post("/api/v1/contact")
      .send(contactMock)
      .end((err, res) => {
        contactId = res.body.contact.id;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal("Successful");
        done();
      });
  });

  it("should return an error that the contact exists", done => {
    chai
      .request(app)
      .post("/api/v1/contact")
      .send(contactMock)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.status.should.equal("Unsuccessful");
        done();
      });
  });

  it("should return an error that phone number entered is incomplete", done => {
    chai
      .request(app)
      .post("/api/v1/contact")
      .send(errorContactMock)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.status.should.equal("Unsuccessful");
        res.body.message.should.equal("Invalid data input");
        done();
      });
  });

  it("should create a new contact", done => {
    chai
      .request(app)
      .post("/api/v1/contact")
      .send(contactMock2)
      .end((err, res) => {
        contactId2 = res.body.contact.id;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal("Successful");
        done();
      });
  });

  it("should create a new contact", done => {
    chai
      .request(app)
      .post("/api/v1/contact")
      .send(contactMock3)
      .end((err, res) => {
        contactId3 = res.body.contact.id;
        should.not.exist(err);
        res.status.should.equal(201);
        res.body.status.should.equal("Successful");
        done();
      });
  });
});

describe("Get all contacts", () => {
  it("list of contacts should be returned", done => {
    chai
      .request(app)
      .get("/api/v1/contacts")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal("Successful");
        should.not.exist(res.body.message);
        done();
      });
  });
});

describe("Delete a contact", () => {
  it("should return an error that contact does not exist", done => {
    chai
      .request(app)
      .delete("/api/v1/contact/61")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(404);
        res.body.status.should.equal("Unsuccessful");
        res.body.message.should.equal("Contact not found");
        done();
      });
  });

  it("should delete the specified contact", done => {
    chai
      .request(app)
      .delete(`/api/v1/contact/${contactId3}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.status.should.equal("Successful");
        res.body.message.should.equal("Test has been deleted");
        done();
      });
  });
});
