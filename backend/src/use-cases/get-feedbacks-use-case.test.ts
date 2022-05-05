import { GetFeedbackUseCase } from "./get-feedbacks-use-case";

const getFeedbacksSpy = jest.fn();

const getFeedbacks = new GetFeedbackUseCase({
  create: async () => {},
  get: getFeedbacksSpy,
});

describe("Get feedback list", () => {
  it("should be able to get feedback list", async () => {
    await expect(getFeedbacks.execute()).resolves.not.toThrow();
    expect(getFeedbacksSpy).toBeCalled();
  });
});
