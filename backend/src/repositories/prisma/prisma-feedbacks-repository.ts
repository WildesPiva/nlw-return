import { prisma } from "../../prisma";
import {
  Feedback,
  FeedbackCreateData,
  FeedbacksRepository,
} from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
  async get() {
    const feedbacks = (await prisma.feedback.findMany()) as Feedback[];
    return feedbacks;
  }
}
