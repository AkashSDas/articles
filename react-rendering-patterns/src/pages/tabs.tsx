import { useState, lazy, Suspense } from "react";
import { FirstTab } from "@app/components/FirstTab";

const SecondTab = lazy(async () => {
    return import("@app/components/SecondTab").then((mod) => ({
        default: mod.SecondTab,
    }));
});

export default function Tabs() {
    const [tab, setTab] = useState(0);

    return (
        <main>
            <h1>Tabs</h1>

            <div>
                <button onClick={() => setTab(0)}>Tab 1</button>
                <button onClick={() => setTab(1)}>Tab 2</button>
            </div>

            {tab === 0 ? (
                <FirstTab />
            ) : (
                <Suspense fallback={null}>
                    <SecondTab />
                </Suspense>
            )}
        </main>
    );
}
