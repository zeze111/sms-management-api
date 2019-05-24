import express from "express";
import contact from "../controllers/contacts";

const router = express.Router();
router.post("/contact", contact.create);
router.get("/contact", contact.getAll);
router.delete("/contact/:contactId", contact.delete);

export default router;
