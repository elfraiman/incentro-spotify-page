import { NextApiRequest, NextApiResponse } from 'next';

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    console.error('GROQ_API_KEY environment variable not found');
    return res.status(500).json({ message: 'Groq API key not configured' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a music discovery AI assistant helping users find music on Spotify. Your job is to:

1. Understand what kind of music the user is looking for
2. Provide helpful suggestions and recommendations
3. Generate specific Spotify search queries that will find relevant music
4. Be conversational and friendly while staying focused on music discovery

When responding:
- Always include a "search_query" in your response that can be used to search Spotify
- Keep responses concise but helpful
- Try to tailor the response to someone working at https://incentro.com
- Ask follow-up questions to better understand their preferences
- Suggest specific artists, genres, moods, or activities
- Be enthusiastic about music discovery

Format your response as JSON with this structure:
{
  "message": "Your conversational response to the user",
  "search_query": "specific search terms for Spotify API",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Example:
{
  "message": "I'd love to help you find some great workout music! Based on your request, I'm searching for high-energy tracks that'll keep you motivated.",
  "search_query": "high energy workout pump up music",
  "suggestions": ["Try adding some electronic dance music", "Look for tracks with 120+ BPM", "Consider artists like The Chainsmokers or Calvin Harris"]
}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error response:', errorText);
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data: GroqResponse = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from Groq API');
    }

    // Try to parse the JSON response from the AI
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch {
      // Fallback if AI doesn't return valid JSON
      parsedResponse = {
        message: aiResponse,
        search_query: message, // Use the original message as search query
        suggestions: []
      };
    }

    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).json({
      message: 'Failed to get AI response',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}