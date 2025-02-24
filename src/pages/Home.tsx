import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Particles } from "@/components/magicui/particles";

export const Home = () => {
    return(
        <main>
            <section>
                <div className="relative flex flex-col justify-center items-center h-screen">
                    <div className="text-center z-10">
                        <h1 className="text-9xl font-bold text-primary-accent mb-2">Snap<LineShadowText className="" shadowColor={'#00df82'}>AI</LineShadowText></h1>
                        <TextAnimate animation="slideLeft" by="character" once className="text-primary-accent text-lg tracking-widest">Generate stunning react components at the snap of a finger</TextAnimate>
                    </div>
                    <div className="mt-12 z-10">
                        <form>
                            <textarea
                                placeholder="Describe your component..."
                                className="bg-primary-dark border border-primary-accent/50 rounded-md text-area-shadow resize-y w-[450px] h-24 p-2 placeholder:text-white/50"
                            />
                        </form>
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