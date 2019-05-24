import Validator from "validatorjs";
import { textRules } from "../helper";
import { Text, Contact } from "../models";

export default class Texts {
  static create(request, response) {
    const validator = new Validator(request.body, textRules);
    if (validator.passes()) {
      const contactId = parseInt(request.params.contactId);
      Contact.findByPk(contactId)
        .then(registeredContact => {
          if (registeredContact) {
            const requestNo = parseInt(request.body.receiver);
            Contact.findOne({
              where: { number: requestNo }
            }).then(foundContact => {
              if (foundContact) {
                if (foundContact.id === contactId) {
                  return response.status(400).json({
                    status: "Unsuccessful",
                    message: "Can't send text message to yourself"
                  });
                } else {
                  Text.create({
                    message: request.body.message,
                    status: "sent",
                    receiver: requestNo,
                    contactId: request.params.contactId
                  }).then(textCreated => {
                    return response.status(201).json({
                      status: "Successful",
                      text: textCreated
                    });
                  });
                }
              } else {
                return response.status(404).json({
                  status: "Unsuccessful",
                  message: "The receiver's phone number entered does not exist"
                });
              }
            });
          } else {
            return response.status(404).json({
              status: "Unsuccessful",
              message: "You are not registered to send sms"
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
        status: "Unsuccessful",
        message: "Invalid data input",
        errors
      });
    }
  }

  static getSentTexts(request, response) {
    const contactId = parseInt(request.params.contactId);
    Contact.findByPk(contactId)
      .then(registeredContact => {
        if (registeredContact) {
          Text.findAll({
            where: { contactId },
            attributes: [
              "id",
              "message",
              "status",
              "receiver",
              ["createdAt", "sentAt"]
            ]
          }).then(messages => {
            if (messages.length === 0) {
              return response.status(200).json({
                status: "Successful",
                message: "You have sent no text messages"
              });
            } else {
              messages.map(message => {
                message.update({ status: "sent" });
              });
              return response.status(200).json({
                status: "Successful",
                texts: messages
              });
            }
          });
        } else {
          return response.status(404).json({
            status: "Unsuccessful",
            message: "Contact does not exist"
          });
        }
      })
      .catch(() =>
        response.status(500).json({
          message: "Internal Server Error"
        })
      );
  }

  static getReceivedTexts(request, response) {
    const contactId = parseInt(request.params.contactId);
    Contact.findByPk(contactId)
      .then(registeredContact => {
        if (registeredContact) {
          Text.findAll({
            where: { receiver: registeredContact.number },
            attributes: [
              "id",
              "message",
              "status",
              ["createdAt", "receivedAt"]
            ],
            include: [
              {
                model: Contact,
                attributes: ["name", "number"]
              }
            ]
          }).then(messages => {
            if (messages.length === 0) {
              return response.status(200).json({
                status: "Successful",
                message: "You have received no text messages"
              });
            } else {
              messages.map(message => {
                message.update({ status: "received" });
              });
              return response.status(200).json({
                status: "Successful",
                texts: messages
              });
            }
          });
        } else {
          return response.status(404).json({
            status: "Unsuccessful",
            message: "Contact does not exist"
          });
        }
      })
      .catch(() =>
        response.status(500).json({
          message: "Internal Server Error"
        })
      );
  }
}
