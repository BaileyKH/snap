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
            apiKey: process.env.SNAP_API_KEY,
        });

        if (!process.env.SNAP_API_KEY) {
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
                    2. Use TailwindCSS for ALL styling - don't use any inline styles.
                    3. Make the component visually appealing with a modern design.
                    4. Include appropriate hover states, animations, and interactions.
                    5. For images, use generic placeholder URLs like "https://placekitten.com/300/200" or similar.
                    6. Keep the component self-contained - only import React.
                    7. Make sure all styles are applied using Tailwind classes only.
                    8. Use a clean, semantic HTML structure.
                    9. For icons, use descriptive text or emoji instead of icon libraries.
                    10. Include comments explaining any complex parts of your code.
                    
                    Important: Return ONLY the code, with no explanations before or after. Make sure the component is correctly formatted JavaScript that will run in a browser with React and Tailwind available.`
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
            error: "An error occurred while generating the component" 
        });
    }
}