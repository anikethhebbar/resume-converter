import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateHtmlWithLLM(text, llm, apiKey) {
  const prompt = `Convert the following plain text resume into a clean, well-formatted HTML resume using standard HTML5 tags and CSS classes for styling. Apply the following specific style guidelines:

  Style Guide:
   Overall Layout: Use a single-column layout that is centered on the page. Ensure the layout adjusts gracefully to various screen sizes.
   Font: Use a sans-serif font like Arial or Helvetica for the entire resume.
   Headers: Use <h3> tags for section headers (e.g., Experience, Education).
   Emphasis: Use <strong> tags for job titles and company names.
   Lists: Use <ul> and <li> tags for listing skills and responsibilities.
   Dates: Ensure the layout is responsive to various screen sizes.
   Color Scheme: Use a neutral color palette with a light background and dark text. Consider using a subtle accent color for headers or section dividers.

  Resume Text:
  \`\`\`
  ${text}
  \`\`\`
  Exit saying its not resume if unwanted PDF text found.
  Desired Output: A complete HTML document with consistent styling, responsive to various screen sizes, including <html>, <head>, and <body> tags. Omit irrelevant information and prioritize a visually appealing, standardized layout adhering to the specified style guide.`;

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