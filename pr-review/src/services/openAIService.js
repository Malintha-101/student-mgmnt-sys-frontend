const axios = require("axios");
require("dotenv").config();

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

async function reviewPullRequest(prData) {
  try {
    const prompt = `As a Senior Tech Lead, review the following GitHub pull request and provide comprehensive feedback. Focus on code quality, architecture, performance, scalability, maintainability, adherence to best practices, and potential edge cases. Provide actionable suggestions for improvement where necessary. If there are any issues, provide the correct code with Markdown syntax. Use triple backticks to format code blocks and highlight specific lines that need changes.
        Pull Request Details:\n${JSON.stringify(prData, null)}`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a code reviewer." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reviewContent = response.data.choices[0].message.content;
    const formattedReview = `## Pull Request Review\n\n${reviewContent}`;

    return formattedReview;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    if (error.response?.data?.error?.code === "insufficient_quota") {
      console.error(
        "Error in OpenAI request: Insufficient quota. Please check your plan and billing details.",
        errorMessage
      );
    } else {
      console.error("Error in OpenAI request:", errorMessage);
    }
    throw new Error("Failed to get review from OpenAI");
  }
}

module.exports = { reviewPullRequest };
