import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Design Patterns</title>
                <meta name="description" content="React Design Patterns" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={`${inter.className}`}>
                <h1>Design Patterns</h1>

                <ul style={{ padding: "1rem" }}>
                    <li>
                        <Link href="/container-and-presentational-components">
                            Container and Presentational Components
                        </Link>
                    </li>

                    <li>
                        <Link href="/higher-order-components">
                            Higher Order Components
                        </Link>
                    </li>

                    <li>
                        <Link href="/render-props">Render Props</Link>
                    </li>

                    <li>
                        <Link href="/hooks">Hooks</Link>
                    </li>

                    <li>
                        <Link href="/provider">Provider</Link>
                    </li>

                    <li>
                        <Link href="/compound">Compound</Link>
                    </li>
                </ul>
            </main>
        </>
    );
}
