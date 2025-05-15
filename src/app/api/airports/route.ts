// app/api/airports/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("skiable"); // replace with your actual DB name
    const url = new URL(req.url);

    // Get query parameters
    const country = url.searchParams.get("country"); // e.g. "US"
    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    // Build filter object dynamically
    const filter: Record<string, unknown> = {};
    if (country) {
      filter.iso_country = country.toUpperCase(); // MongoDB filter by country code
    }

        // Query airports collection with filter and limit
        const airports = await db.collection("airports")
            .find(filter)
            .limit(limit)
            .toArray();

        return NextResponse.json(airports);
    } catch (error) {
        console.error("Error fetching airports:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
