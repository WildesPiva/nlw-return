import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { GetFeedbackUseCase } from "./use-cases/get-feedbacks-use-case";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

routes.post("/feedback", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});

routes.get("/feedbacks", async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const getFeedbackUseCase = new GetFeedbackUseCase(prismaFeedbacksRepository);
  const feedbacks = await getFeedbackUseCase.execute();
  return res.json({
    count: feedbacks.length,
    data: feedbacks,
  });
});
