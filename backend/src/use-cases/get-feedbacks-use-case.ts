import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export class GetFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {
    this.feedbacksRepository = feedbacksRepository;
  }

  async execute() {
    return await this.feedbacksRepository.get();
  }
}
