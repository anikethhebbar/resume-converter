import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import { extractTextFromPdf } from '/utils/extractText';
import { generateHtmlWithLLM } from '/utils/generateHtml';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = new IncomingForm({
    keepExtensions: true,
    multiples: false,
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const llm = fields.llm[0];
    const apiKey = fields.apiKey[0];
    const file = files.file[0];

    if (!llm || !apiKey || !file) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Read file buffer
    const fileBuffer = await fs.readFile(file.filepath);

    // Extract text from PDF
    const text = await extractTextFromPdf(fileBuffer);

    // Generate HTML with LLM
    const html = await generateHtmlWithLLM(text, llm, apiKey);

    // Clean up the temporary file
    await fs.unlink(file.filepath);

    res.status(200).json({ html });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Error processing PDF' });
  }
}