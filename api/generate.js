import OpenAI from "openai";

export default async function handler(req, res) {

    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        const { prompt } = req.body;
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
            
        });

        const generatedComponent = response.choices?.[0]?.message?.content?.trim();
        if (!generatedComponent) {
            return res.status(500).json({ error: "Unexpected response" })
        }

        return res.status(200).json({ component: generatedComponent });

    } catch (error) {
        console.error("Server error:", error)
        return res.status(500).json({ error: error.message });
    }
}