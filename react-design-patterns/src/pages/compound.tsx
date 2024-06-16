import {
    createContext,
    useContext,
    useState,
    PropsWithChildren,
    cloneElement,
    isValidElement,
    Children,
} from "react";

type AccordionContextValue = {
    openIndex: number | null;
    toggleItem: (idx: number) => void;
};

const AccordionContext = createContext<AccordionContextValue>({
    openIndex: null,
    toggleItem: () => {},
});

// Reusable hook for managing accordion state
function useAccordion() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion provider is not accessible");
    }

    return context;
}

// Root component
function Accordion({ children }: PropsWithChildren<unknown>) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    function toggleItem(idx: number) {
        setOpenIndex(idx === openIndex ? null : idx);
    }

    return (
        <AccordionContext.Provider value={{ openIndex, toggleItem }}>
            {children}
        </AccordionContext.Provider>
    );
}

function AccordionItem(props: PropsWithChildren<{ index: number }>) {
    const { index, children } = props;
    const { openIndex, toggleItem } = useAccordion();
    const isOpen = openIndex === index;

    return (
        <div>
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, {
                        isOpen,
                        toggleItem,
                        index,
                    } as any);
                }
                return child;
            })}
        </div>
    );
}

function AccordionHeader(props: PropsWithChildren<{ index?: number }>) {
    const { index, children } = props;
    const { toggleItem } = useAccordion();

    return (
        <div
            onClick={() => toggleItem(index!)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
        >
            {children}
        </div>
    );
}

function AccordionPanel(props: PropsWithChildren<{ isOpen?: boolean }>) {
    const { children, isOpen } = props;
    return isOpen ? <div>{children}</div> : null;
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

export default function CompoundPattern() {
    return (
        <Accordion>
            <Accordion.Item index={0}>
                <Accordion.Header>Item 1</Accordion.Header>
                <Accordion.Panel>
                    <p>Content 1</p>
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item index={1}>
                <Accordion.Header>Item 2</Accordion.Header>
                <Accordion.Panel>
                    <p>Content 2</p>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
