import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diaries = diaryService.getEntries();
  res.send(diaries);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
