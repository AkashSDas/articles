import type { NextApiRequest, NextApiResponse } from "next";

type User = {
    name: string;
    age: number;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ users: User[] } | { error: string }>
) {
    if (req.method === "GET") {
        return res.status(200).json({
            users: [
                { name: "John", age: 30 },
                { name: "Jane", age: 28 },
                { name: "Jim", age: 27 },
                { name: "Jill", age: 26 },
                { name: "Jack", age: 25 },
                { name: "Jen", age: 24 },
            ],
        });
    }

    return res.status(405).json({ error: "Method not allowed" });
}
