import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy, get: async () => [] },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,12313dwq3c4w5sq6re32d32",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it("should not be able submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,12313dwq2d2cws2qre32d32",
      })
    ).rejects.toThrow();
  });

  it("should not be able submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,12313dwqdcw2s2s2q2re32d32",
      })
    ).rejects.toThrow();
  });

  it("should not be able submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This is an comment",
        screenshot: "binary,12313dwq2s2s2q2re32d32",
      })
    ).rejects.toThrow();
  });
});
