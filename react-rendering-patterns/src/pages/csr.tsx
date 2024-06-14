import { useState } from "react";

export default function CSRExample() {
    const [count, setCount] = useState(0);

    return (
        <main>
            <h1>CSR</h1>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>⬆️ Increment</button>
        </main>
    );
}
