import { useState, FC } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { IconClipboard, IconEye, IconCode } from '@tabler/icons-react';

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Particles } from "@/components/magicui/particles";

export const Home: FC = () => {
    const [description, setDescription] = useState<string>('');
    const [compCode, setCompCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
    const [error, setError] = useState<string>('');

    const handleGeneration = async (): Promise<void> => {
        if (!description) return;
        
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch('/api/generate', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: description })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate component');
            }

            const data = await response.json();
            setCompCode(data.component);
        } catch (err) {
            console.error("Generation error:", err);
            setError(err instanceof Error ? err.message : 'An error occurred during generation');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyToClipboard = (): void => {
        if (!compCode) return;
        navigator.clipboard.writeText(compCode)
            .then(() => {
                const notification = document.createElement('div');
                notification.textContent = 'Copied to clipboard!';
                notification.className = 'fixed top-4 right-4 bg-primary-accent text-primary-dark px-4 py-2 rounded-md z-50 animate-fade-in-out';
                document.body.appendChild(notification);
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 2000);
            })
            .catch((error) => {
                setError("Failed to copy code: " + (error instanceof Error ? error.message : String(error)));
            });
    };
    
    const renderComponentPreview = () => {
        if (!compCode) return null;
        
        try {
            let jsxContent = compCode;
            const returnMatch = compCode.match(/return\s*\(\s*([\s\S]*?)\s*\)\s*;?/);

            if (returnMatch && returnMatch[1]) {
                jsxContent = returnMatch[1];
            }

            return (
                <div className="w-full h-96 overflow-hidden border-2 border-primary-accent/20 rounded-md bg-white">
                    <iframe
                        srcDoc={`
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <script src="https://cdn.tailwindcss.com"></script>
                                <style>
                                    body {
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        min-height: 100vh;
                                        padding: 2rem;
                                    }
                                    /* Add your custom colors */
                                    :root {
                                        --primary-dark: #111827;
                                        --primary-accent: #00df82;
                                    }
                                </style>
                            </head>
                            <body>
                                <div id="preview-container">${jsxContent}</div>
                            </body>
                            </html>
                        `}
                        className="w-full h-full"
                        title="Component Preview"
                    />
                </div>
            );
        } catch (err) {
            console.error("Preview error:", err);
            return (
                <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    Unable to preview the component. This might be due to complex React features 
                    that can't be rendered in a simple preview.
                </div>
            );
        }
    };
    
    return (
        <main>
            <section>
                <div className="relative flex flex-col justify-center items-center py-8 h-screen">
                    <div className="text-center z-10">
                        <h1 className="text-9xl font-bold text-primary-accent mb-2">
                            Snap<LineShadowText shadowColor={'#00df82'}>AI</LineShadowText>
                        </h1>
                        <p className="text-primary-accent text-lg tracking-widest">
                            Generate stunning react components at the snap of a finger
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 mt-12 z-10 w-full max-w-2xl">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your component... (e.g., 'A card with an image, title, and description with a hover effect')"
                            className="bg-primary-dark border border-primary-accent/50 rounded-md text-area-shadow resize-y w-full h-24 p-3 placeholder:text-white/50 text-white focus:outline-primary-accent focus:ring-2 focus:ring-primary-accent focus:ring-offset-0"
                        />
                        <div className="flex w-full justify-end">
                            <button 
                                onClick={handleGeneration}
                                disabled={isLoading || !description.trim()}
                                className={`
                                    border border-primary-accent rounded-md text-primary-accent px-6 py-2
                                    ${isLoading || !description.trim() 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:bg-primary-accent hover:text-primary-dark transition-colors duration-300 ease-in-out cursor-pointer'}
                                    tracking-wide flex items-center gap-2
                                `}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    <>Create</>
                                )}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="mt-4 text-red-500 bg-red-100/10 border border-red-500/30 rounded-md p-2 max-w-2xl w-full text-center">
                            {error}
                        </div>
                    )}
                    {compCode && (
                        <div className="z-10 mt-8 w-full max-w-7xl">
                            <div className="flex border-b border-primary-accent/30 mb-2">
                                <button
                                    onClick={() => setActiveTab('code')}
                                    className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'code' ? 'border-b-2 border-primary-accent text-primary-accent' : 'text-white/70 hover:text-white'}`}
                                >
                                    <IconCode size={18} />
                                    Code
                                </button>
                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'preview' ? 'border-b-2 border-primary-accent text-primary-accent' : 'text-white/70 hover:text-white'}`}
                                >
                                    <IconEye size={18} />
                                    Preview
                                </button>
                            </div>
                            {activeTab === 'code' ? (
                                <div className="relative">
                                    <button
                                        onClick={handleCopyToClipboard}
                                        className="absolute top-2 right-2 bg-primary-accent border border-primary-accent p-1 rounded-md focus:outline-none hover:bg-primary-dark transition-colors duration-300 ease-in-out cursor-pointer z-20"
                                        title="Copy to Clipboard"
                                    >
                                        <IconClipboard stroke={1.5} className="text-primary-dark hover:text-primary-accent transition-colors duration-300 ease-in-out"/>
                                    </button>
                                    <pre className="bg-primary-dark border-2 border-primary-accent/20 text-white rounded-md w-full overflow-auto">
                                        <SyntaxHighlighter language='javascript' style={atelierCaveDark} showLineNumbers={true}>
                                            {compCode}
                                        </SyntaxHighlighter>
                                    </pre>
                                </div>
                            ) : (
                                <div className="mb-12">
                                    {renderComponentPreview()}
                                </div>
                            )}
                        </div>
                    )}
                    <Particles
                        className="absolute inset-0 z-0"
                        quantity={200}
                        ease={80}
                        color='#00df82'
                        refresh
                    />
                </div>
            </section>
        </main>
    );
};