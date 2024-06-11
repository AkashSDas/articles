// Static import
import { useState, lazy, Suspense } from "react";
import { Banner } from "./components/Banner";

// Dynamic imports
const Home = lazy(() =>
    // named export
    import("./components/Home").then((module) => ({ default: module.Home }))
);
const About = lazy(() => import("./components/About")); // default export

export default function App() {
    const [tab, setTab] = useState<"home" | "about">("home");

    return (
        <main>
            <Banner />

            <nav>
                <button onClick={() => setTab("home")}>Home</button>
                <button onClick={() => setTab("about")}>About</button>
            </nav>

            {tab === "home" ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </Suspense>
            ) : (
                <Suspense fallback={<div>Loading...</div>}>
                    <About />
                </Suspense>
            )}
        </main>
    );
}
