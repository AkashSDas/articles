import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// All client related things should be here like Router, Google Analytics, etc.

hydrateRoot(
    document.getElementById("root")!,
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
