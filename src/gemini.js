import axios from 'axios';

const apiKey = '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';

export default async function runAI(prompt) {
  try {
    const res = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('OpenRouter API error:', err);
    return 'Error contacting AI model';
  }
}
