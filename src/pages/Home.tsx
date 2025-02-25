import { useState } from "react";

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Particles } from "@/components/magicui/particles";

export const Home = () => {

    const [description, setDescription] = useState('');
    const [compCode, setCompCode] = useState(`
            javascript
import React from 'react';

const RedButton = ({ text = 'Click Me', onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500 transition duration-200"
        >
            {text}
        </button>
    );
};

export default RedButton;

### Explanation:

1. **Component Definition**: The RedButton component is a functional component that takes in two props: text and onClick. The text prop provides customizable button content and defaults to "Click Me" if no value is passed. The onClick prop allows you to pass a function to handle button clicks.

2. **Button Element**: The button element is styled using TailwindCSS classes:
   - bg-red-600: Sets the background color to a red shade.
   - text-white: Colors the text white.
   - font-semibold: Applies a semi-bold font weight.
   - py-2 and px-4: Adds padding vertically and horizontally for better spacing.
   - rounded: Gives the button rounded corners.
   - shadow-md: Applies a medium shadow for depth.
   - hover:bg-red-700: Changes the background color to a darker red on hover.
   - focus:outline-none: Removes the default outline on focus.
   - focus:ring focus:ring-red-500: Adds a ring effect when the button is focused, enhancing accessibility visually.
   - transition duration-200: Applies a smooth transition effect when state changes (such as hover).

### Usage Example:

You can use this RedButton component in any part of your application like this:

javascript
import React from 'react';
import RedButton from './RedButton';

const App = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <RedButton text="Submit" onClick={handleClick} />
        </div>
    );
};

export default App;

In this example, clicking the "Submit" button will trigger an alert showing "Button clicked!". You can customize the button text by changing the text prop when rendering RedButton.
        `);

    const handleGeneration = async () => {
        if (!description) return;

        const response = await fetch('api/generate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: description })
        });

        const data = await response.json();
        setCompCode(data.component)
    }

    return(
        <main>
            <section>
                <div className="relative flex flex-col justify-center items-center py-8">
                    <div className="text-center z-10">
                        <h1 className="text-9xl font-bold text-primary-accent mb-2">Snap<LineShadowText className="" shadowColor={'#00df82'}>AI</LineShadowText></h1>
                        <TextAnimate animation="slideLeft" by="character" once={true} className="text-primary-accent text-lg tracking-widest">Generate stunning react components at the snap of a finger</TextAnimate>
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
                            <pre className="my-12 p-4 bg-primary-dark border-2 border-primary-accent/20 text-white rounded-md w-full max-w-7xl overflow-scroll">
                                <code>{compCode}</code>
                            </pre>
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
}