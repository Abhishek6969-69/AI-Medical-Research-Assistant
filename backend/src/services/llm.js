const Groq = require('groq-sdk');

function getTextModel() {
  return process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';
}

async function generateAnswer({ systemPrompt, userMessage }) {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    throw new Error('GROQ_API_KEY is not configured in .env');
  }

  const groq = new Groq({ apiKey: groqApiKey });

  try {
    const response = await groq.chat.completions.create({
      model: getTextModel(),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 700,
      temperature: 0.2,
      top_p: 0.9,
    });

    const generatedText = response.choices?.[0]?.message?.content;

    if (!generatedText) {
      throw new Error('No generated text returned from Groq');
    }

    return generatedText;
  } catch (error) {
    const message = error.message || 'Groq text generation failed';
    throw new Error(`Groq API Error: ${message}`);
  }
}

module.exports = {
  generateAnswer,
};
