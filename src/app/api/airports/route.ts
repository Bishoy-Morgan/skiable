import type { Filter, Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("skiable");
    const url = new URL(req.url);

    const query = url.searchParams.get("query")?.trim();
    const limit = parseInt(url.searchParams.get("limit") || "50");

    const airportFilter: Filter<Document> = {
    type: { $in: ["small_airport", "large_airport"] },
    gps_code: { $ne: "" },
    };

    let countryCode: string | null = null;

    if (query) {
        // Try to match the country name first
        const country = await db.collection("countries").findOne({
        name: { $regex: `^${query}$`, $options: "i" },
        });

        if (country?.code) {
            countryCode = country.code;
        }

        // Build the OR filter: match airport name OR match iso_country
        airportFilter.$or = [
            { name: { $regex: query, $options: "i" } },
            ...(countryCode ? [{ iso_country: countryCode }] : []),
        ];
    }

    const airports = await db
        .collection("airports")
        .find(airportFilter)
        .limit(limit)
        .toArray();

    return NextResponse.json(airports);
    } catch (error) {
        console.error("Error in airport search route:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
