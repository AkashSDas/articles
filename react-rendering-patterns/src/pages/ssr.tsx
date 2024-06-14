import { GetServerSideProps, InferGetServerSidePropsType } from "next";

// serverless or edge runtime
export const config = {
    runtime: "nodejs", // or "edge"
};

type Props = { username: string };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    if (!ctx.query.username) {
        return {
            notFound: true,
        };
    }

    return {
        props: { username: ctx.query.username.toString() },
    };
};

export default function SSRExample(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return (
        <main>
            <h1>SSR</h1>
            <p>{props.username}</p>
        </main>
    );
}
