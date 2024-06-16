import { useRef, useState } from "react";

function ControlledInput() {
    const [value, setValue] = useState("");

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

function UncontrolledInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const value = inputRef.current?.value;
        if (value) {
            console.log(value);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={inputRef} />
        </form>
    );
}

export default function ControlledAndUncontrolledComponents() {
    return (
        <div>
            <ControlledInput />
            <UncontrolledInput />
        </div>
    );
}
