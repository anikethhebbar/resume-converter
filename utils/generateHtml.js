import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateHtmlWithLLM(text, llm, apiKey) {
  const prompt = `Convert the following plain text resume into a clean, well-formatted HTML resume using standard HTML5 tags and CSS classes for styling.
  
  **Resume Text:**
  \`\`\`
  ${text}
  \`\`\`
  
  **Desired Output:** A complete HTML document with consistent styling, including <html>, <head>, and <body> tags. Omit irrelevant information and prioritize a visually appealing, standardized layout.`;

  try {
    switch (llm) {
      case 'openai':
        const openai = new OpenAI({ apiKey });
        const openaiCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        });
        return openaiCompletion.choices[0].message.content;

      case 'anthropic':
        const anthropic = new Anthropic({ apiKey });
        const anthropicResponse = await anthropic.completions.create({
          model: "claude-3.5-sonnet",
          prompt: prompt,
          max_tokens_to_sample: 2000,
        });
        return anthropicResponse.completion;

      case 'gemini':
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const googleResponse = await model.generateContent(prompt);
        return googleResponse.response.text();

      default:
        throw new Error('Invalid LLM choice');
    }
  } catch (error) {
    console.error('Error generating HTML with LLM:', error);
    throw error;
  }
}