import OpenAI from "openai";

export default async function handler(req, res) {

    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    const { prompt } = JSON.parse(req.body);

    const openai = new OpenAI({
        apiKey: process.env.SNAP_API_KEY,
    });

    try {
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

        return res.status(200).json({ component: response.data.choices[0].text.trim() });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}