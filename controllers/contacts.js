import Validator from "validatorjs";
import { contactRules } from "../helper";
import { Contact } from "../models";

export default class Contacts {
  static create(request, response) {
    const validator = new Validator(request.body, contactRules);
    if (validator.passes()) {
    const requestNo = parseInt(request.body.number);
    Contact.findOne({
      where: { number: requestNo }
    })
      .then(foundContact => {
        if (foundContact) {
          return response.status(409).json({
            status: "Unsuccessful",
            message: "Contact already exist"
          });
        } else {
          Contact.create({
            name: request.body.name,
            number: requestNo
          }).then(contactCreated => {
            const contact = {
              id: contactCreated.id,
              name: contactCreated.name,
              number: contactCreated.number
            };
            return response.status(201).json({
              status: "Successful",
              contact
            });
          });
        }
      })
      .catch(() =>
        response.status(500).json({
          message: "Internal Server Error"
        })
      );
    } else {
      const errors = validator.errors.all();
      return response.status(422).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors,
      });
    }
  }

  static getAll(request, response) {
    Contact.findAll({})
      .then(contacts => {
        if (contacts.length === 0) {
          return response.status(200).json({
            status: "Successful",
            message: "There Are Currently No Contacts",
            contacts: []
          });
        } else {
          return response.status(200).json({
            status: "Successful",
            contacts
          });
        }
      })
      .catch(() =>
        response.status(500).json({
          message: "Internal Server Error"
        })
      );
  }

  static delete(request, response) {
    const contactId = parseInt(request.params.contactId);
    Contact.findByPk(contactId)
      .then(registeredContact => {
        if (!registeredContact) {
          response.status(404).json({
            status: "Unsuccessful",
            message: "Contact not found"
          });
        } else {
          registeredContact
            .destroy()
            .then(() => {
              response.status(200).json({
                status: "Successful",
                message: `${registeredContact.name} has been deleted`
              });
            })
            .catch(error => response.status(400).send(error));
        }
      })
      .catch(() =>
        response.status(500).json({
          message: "Internal Server Error"
        })
      );
  }
}
