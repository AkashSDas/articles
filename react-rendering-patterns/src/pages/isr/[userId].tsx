import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const data = [
    { userId: 1, username: "John Doe", initialCount: 0 },
    { userId: 2, username: "Jane Doe", initialCount: 5 },
    { userId: 3, username: "Jack Doe", initialCount: 2 },
];

const newData = [
    { userId: 4, username: "Robin", initialCount: 0 },
    { userId: 5, username: "Ron", initialCount: 5 },
    { userId: 6, username: "Rolly", initialCount: 2 },
];

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: data.map((user) => ({
            params: { userId: user.userId.toString() },
        })),
        fallback: "blocking",
    };
};

type Props = {
    user: (typeof data)[number];
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    if (!ctx.params?.userId) {
        return {
            notFound: true,
        };
    }

    let user = data.find((user) => user.userId === Number(ctx.params!.userId));

    if (!user) {
        user = newData.find(
            (user) => user.userId === Number(ctx.params!.userId)
        );

        if (!user) {
            return {
                notFound: true,
            };
        }
    }

    return {
        props: { user },
        revalidate: 10,
    };
};

export default function ISRExample(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    const [count, setCount] = useState(props.user.initialCount);
    const router = useRouter();

    // if fallback is true
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <h1>ISR</h1>
            <p>
                {props.user.username} {count}
            </p>
            <button onClick={() => setCount(count + 1)}>⬆️ Increment</button>
        </main>
    );
}
