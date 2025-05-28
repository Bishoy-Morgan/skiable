import type { Filter, Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("skiable");
        const url = new URL(req.url);

        const query = url.searchParams.get("query")?.trim();
        const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100); // max 100

        const airportFilter: Filter<Document> = {
            Type: "airport",
            IATA: { $ne: "" },
        };

        if (query) {
        airportFilter.$or = [
            { Name: { $regex: query, $options: "i" } },     // Airport name
            { City: { $regex: query, $options: "i" } },     // City
            { Country: { $regex: query, $options: "i" } },  // Country
        ];
        }

        const airports = await db
            .collection("airports")
            .find(airportFilter)
            .limit(limit)
            .project({
                _id: 0,             
                AirportID: 1,        
                City: 1,
                Name: 1,
                Country: 1,
                IATA: 1,
                ICAO: 1,
            })
        .toArray();

        return NextResponse.json(airports);
    } catch (error) {
        console.error("Error in airport search route:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
