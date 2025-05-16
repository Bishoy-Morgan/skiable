import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/src/lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const client = await clientPromise;
        const db = client.db("aviation");
        const collection = db.collection("navaids");

        if (req.method === "GET") {
        const data = await collection.find({}).limit(100).toArray();
            res.status(200).json(data);
        } else {
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error fetching airports:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
