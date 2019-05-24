import express from "express";
import text from "../controllers/texts";

const router = express.Router();
router.post("/:contactId/text", text.create);
router.get("/:contactId/sent-texts", text.getSentTexts)
router.get("/:contactId/received-texts", text.getReceivedTexts)

export default router;
