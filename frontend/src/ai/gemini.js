import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBaH86SK4IGzl-GI1EEiuOb8HbS8OL93Bw");

export const generateMatchExplanation = async (need, volunteer) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    A person needs help:
    Title: ${need.title}
    Description: ${need.description}
    Location: ${need.location}

    Volunteer:
    Name: ${volunteer.name}
    Skills: ${volunteer.skills}
    Location: ${volunteer.location}

    Explain in 1 short sentence why this volunteer is a good match.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.log("Gemini error:", error);
    return "Good match based on skills and location.";
  }
};