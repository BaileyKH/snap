import OpenAI from "openai";

export default async function handler(req, res) {

    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        let body;
        try {
            body = JSON.parse(req.body);
        } catch (err) {
            return res.status(400).json({ error: "Invalid JSON format in request body" })
        }

        const { prompt } = body;
        if (!prompt) {
            return res.status(400).json({ error: "Missing 'prompt' field in request" })
        }

        const openai = new OpenAI({
            apiKey: process.env.SNAP_API_KEY,
        });

        if (!process.env.SNAP_API_KEY) {
            return res.status(500).json({ error: "OpenAI API key is missing" });
        }
    
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: false,
            messages: [
                {"role": "developer", "content": "You are a helpful assistant that answers programming questions in the style of a senior front-end software engineer."},
                {
                    role: "user",
                    content: `Generate a React component using TailwindCSS for the following description: ${prompt}`
                }
            ],
            max_tokens: 200,
        });

        if (!response?.data?.choices?.[0]?.text) {
            return res.status(500).json({ error: "Unexpected response" })
        }

        return res.status(200).json({ component: response.data.choices[0].text.trim() });
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}