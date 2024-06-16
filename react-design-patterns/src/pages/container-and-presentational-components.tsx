import { useQuery } from "@tanstack/react-query";

type PresentationProps = {
    users: { name: string; age: number }[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};

function Presentation(props: PresentationProps) {
    if (props.isError) {
        return <p>{props.error?.message ?? "Something went wrong"}</p>;
    } else if (props.isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <ul style={{ padding: "1rem" }}>
            {props.users.map((user) => (
                <li key={user.name}>
                    {user.name} is {user.age} years old
                </li>
            ))}
        </ul>
    );
}

function Container() {
    const { data, error, isError, isPending } = useQuery({
        queryKey: ["users"],
        async queryFn() {
            const res = await fetch("/api/users", { method: "get" });
            if (res.status !== 200) {
                throw new Error(res.statusText ?? "Something went wrong");
            }

            const data = await res.json();
            if (!data.users) {
                throw new Error(data.error ?? "Something went wrong");
            }

            return data;
        },
    });

    return (
        <div>
            <Presentation
                users={data?.users ?? []}
                isLoading={isPending}
                isError={isError}
                error={error}
            />
        </div>
    );
}

export default function ContainerAndPresentationsComponentsPattern() {
    return <Container />;
}
