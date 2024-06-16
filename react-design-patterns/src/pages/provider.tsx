import { createContext, useContext, useState } from "react";

type Theme = {
    theme: "light" | "dark";
    toggleTheme: () => void;
};

const ThemeContext = createContext<Theme>({
    theme: "light",
    toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme["theme"]>("light");

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme: () => {
                    setTheme(theme === "light" ? "dark" : "light");
                },
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav>
            <button onClick={toggleTheme}>Toggle {theme}</button>
        </nav>
    );
}

export default function Provider() {
    return (
        <main>
            <ThemeProvider>
                <Navbar />
            </ThemeProvider>
        </main>
    );
}
