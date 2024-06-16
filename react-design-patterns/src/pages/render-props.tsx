// ====================================
// Auth protected
// ====================================

import { ComponentType, FunctionComponent, useState } from "react";

type AuthRouteProps = {
    isAuthenticated: boolean;
    renderContent: () => JSX.Element;
    renderNotAuth: () => JSX.Element;
};

function AuthRoute({
    isAuthenticated,
    renderContent,
    renderNotAuth,
}: AuthRouteProps) {
    return isAuthenticated ? renderContent() : renderNotAuth();
}

function RenderProps1() {
    return (
        <AuthRoute
            isAuthenticated={false}
            renderContent={() => <p>Authenticated content</p>}
            renderNotAuth={() => <p>Not authenticated content</p>}
        />
    );
}

// ====================================
// Form state
// ====================================

function FormState({
    children,
}: {
    children: FunctionComponent<{
        values: Record<string, any>;
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }>;
}) {
    const [state, setState] = useState<Record<string, any>>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <>
            {children({
                values: state,
                handleChange,
            })}
        </>
    );
}

function RenderProps2() {
    return (
        <FormState>
            {({ values, handleChange }) => (
                <>
                    <pre lang="json">{JSON.stringify(values, null, 2)}</pre>

                    <input
                        type="text"
                        name="name"
                        value={values.name ?? ""}
                        onChange={handleChange}
                    />
                </>
            )}
        </FormState>
    );
}

export default function RenderProps() {
    return (
        <>
            <RenderProps1 />

            <RenderProps2 />
        </>
    );
}
