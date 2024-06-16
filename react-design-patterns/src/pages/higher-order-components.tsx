import { ComponentType } from "react";

type HeadingProps = {
    styles: Record<string, any>;
};

// Higher order component
function withHeadingStyles(
    Component: ComponentType<HeadingProps>,
    variant: "h1" | "h2" | "h3"
) {
    let fontSize = "1.5rem";
    if (variant === "h1") {
        fontSize = "3rem";
    } else if (variant === "h2") {
        fontSize = "2.5rem";
    }

    return function NewComponent(props: Record<string, any>) {
        const styles = {
            margin: "0.5rem 1rem",
            fontFamily: "serif",
            fontSize,
            ...props.styles,
        };

        return <Component styles={styles} {...props} />;
    };
}

// Consumer
const Text = withHeadingStyles(({ styles }: HeadingProps) => {
    return <h1 style={styles}>Heading</h1>;
}, "h1");

export default function HigerOrderComponents() {
    return <Text styles={{ fontSize: "4rem" }} />;
}
