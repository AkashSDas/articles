import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
    users: { name: string; age: number }[];
};

function useUsers() {
    const { data, error, isError, isPending } = useQuery<ApiResponse>({
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

    return {
        users: data?.users ?? [],
        isLoading: isPending,
        isError: isError,
        error: error,
    };
}

export default function Hooks() {
    const { users, isLoading, isError, error } = useUsers();

    return (
        <div>
            <h1>Hooks</h1>

            <ul>
                {users.map((user) => (
                    <li key={user.name}>
                        {user.name} is {user.age} years old
                    </li>
                ))}
            </ul>

            {isError && <p>{error?.message ?? "Something went wrong"}</p>}
            {isLoading && <p>Loading...</p>}
        </div>
    );
}
