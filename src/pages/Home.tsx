import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { IconClipboard } from '@tabler/icons-react';

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Particles } from "@/components/magicui/particles";

export const Home = () => {

    const [copy, setCopy] = useState(false)
    const [description, setDescription] = useState('');
    const [compCode, setCompCode] = useState(``);

    const handleGeneration = async () => {
        if (!description) return;

        const response = await fetch('api/generate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: description })
        });

        const data = await response.json();
        setCompCode(data.component);
    };

    const handleCopyToClipboard = () => {
        if (!compCode) return;
        navigator.clipboard.writeText(compCode)
            .then(() => console.log("Code copied to clipboard"))
            .catch((error) => alert("Failed to copy code: " + error));
    };

    return (
        <main>
            <section>
                <div className="relative flex flex-col justify-center items-center py-8 h-screen">
                    <div className="text-center z-10">
                        <h1 className="text-9xl font-bold text-primary-accent mb-2">
                            Snap<LineShadowText shadowColor={'#00df82'}>AI</LineShadowText>
                        </h1>
                        <TextAnimate animation="slideLeft" by="character" once={true} className="text-primary-accent text-lg tracking-widest">
                            Generate stunning react components at the snap of a finger
                        </TextAnimate>
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-12 z-10">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your component..."
                            className="bg-primary-dark border border-primary-accent/50 rounded-md text-area-shadow resize-y w-[450px] h-24 p-2 placeholder:text-white/50 text-white"
                        />
                        <button 
                            onClick={handleGeneration}
                            className="border border-primary-accent rounded-md text-primary-accent p-2 hover:bg-primary-accent hover:text-primary-dark transition-colors duration-300 ease-in-out cursor-pointer tracking-wide">
                            Create
                        </button>
                    </div>
                    <div className="flex justify-center items-center z-10 mt-16 w-full">
                        {compCode && (
                            <div className="relative">
                                <button
                                    onClick={handleCopyToClipboard}
                                    className="absolute -top-1 right-2 bg-primary-accent border border-primary-accent p-1 rounded-md focus:outline-none hover:bg-primary-dark transition-colors duration-300 ease-in-out cursor-pointer"
                                    title="Copy to Clipboard"
                                >
                                    <IconClipboard stroke={1.5} className="text-primary-dark hover:text-primary-accent transition-colors duration-300 ease-in-out"/>
                                </button>
                                <pre className="my-12 bg-primary-dark border-2 border-primary-accent/20 text-white rounded-md w-full max-w-7xl overflow-scroll">
                                    <SyntaxHighlighter language='javascript' style={atelierCaveDark}>{compCode}</SyntaxHighlighter>
                                </pre>
                            </div>
                        )}
                    </div>
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
