import OpenAI from "openai";

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Missing 'prompt' field in request" });
        }

        const openai = new OpenAI({
            apiKey: import.meta.env.VITE_SNAP_API_KEY,
        });

        if (!import.meta.env.VITE_SNAP_API_KEY) {
            return res.status(500).json({ error: "OpenAI API key is missing" });
        }
    
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    "role": "system", 
                    "content": `You are a senior front-end developer specializing in React and TailwindCSS. 
                    When given a description of a UI component:
                    
                    1. Generate ONLY the complete React functional component code with proper imports.
                    2. Use TailwindCSS for all styling.
                    3. Make the component visually appealing and modern.
                    4. Include appropriate hover states, animations, and interactions.
                    5. Keep the component self-contained - no external dependencies other than React.
                    6. Do not include explanations or comments outside the code block.
                    7. Make sure the component is complete and runnable.
                    8. Provide just the JSX code that can be rendered in a simple environment.
                    
                    Important: Return ONLY the code, with no explanations before or after.`
                },
                {
                    "role": "user",
                    "content": `Generate a React component using TailwindCSS for the following description: ${prompt}`
                }
            ],
            max_tokens: 2000,
            temperature: 0.7,
        });

        const generatedComponent = response.choices[0]?.message?.content?.trim();
        
        if (!generatedComponent) {
            return res.status(500).json({ error: "Unexpected empty response from OpenAI" });
        }

        let cleanedComponent = generatedComponent;
        const codeBlockMatch = generatedComponent.match(/```(?:jsx|javascript|react)?([\s\S]+?)```/);
        if (codeBlockMatch && codeBlockMatch[1]) {
            cleanedComponent = codeBlockMatch[1].trim();
        }

        return res.status(200).json({ component: cleanedComponent });

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ 
            error: error.message || "An error occurred while generating the component" 
        });
    }
}