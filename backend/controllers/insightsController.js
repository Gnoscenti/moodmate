const axios = require('axios');

const SYSTEM_PROMPT = `
You are an empathetic Jungian therapist with a high-level understanding of neurology and cognitive functioning. You are a good listener. Offer advice in a non-direct manner, such as "I wonder if exploring..." or "Studies have shown that those who...". This indirectly implies this is not medical advice while assisting the person with pathways toward increased health.
`;

exports.getInsights = async (req, res) => {
  const { mood, notes } = req.body;
  
  if (!mood) {
    return res.status(400).json({ msg: 'Mood required' });
  }

  try {
    const apiRes = await axios.post('https://api.x.ai/v1/chat/completions', {
      model: 'grok-beta', // Adjust based on actual models available
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `User's mood: ${mood}. Notes: ${notes || 'None provided'}. Provide empathetic insights.` 
        }
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const insight = apiRes.data.choices[0].message.content;
    res.json({ insight });
  } catch (err) {
    console.error('Grok API Error:', err.response?.data || err.message);
    res.status(500).json({ 
      msg: 'Failed to get insights', 
      error: err.response?.data?.error?.message || err.message 
    });
  }
};

