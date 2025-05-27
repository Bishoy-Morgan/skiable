import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';

type DateStringFilter = {
  $gte?: string;
  $lte?: string;
};

type Flight = {
  origin_code: string;
  destination_code: string;
  departure: string;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const originIATA = searchParams.get('originIATA');
    const destinationIATA = searchParams.get('destinationIATA');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!originIATA || !destinationIATA) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('skiable');
    const collection = db.collection<Flight>('v2-searchFlights');

    const limitParam = searchParams.get('limit');
    const skipParam = searchParams.get('skip');

    const limit = limitParam ? parseInt(limitParam) : 10;
    const skip = skipParam ? parseInt(skipParam) : 0;


    let directFlights: Flight[] = [];
    let relatedFlights: Flight[] = [];

    if (startDate && endDate) {
      const startDateStr = `${startDate}T00:00:00`;
      const endDateStr = `${endDate}T23:59:59`;

      const departureFilter: DateStringFilter = {
        $gte: startDateStr,
        $lte: endDateStr,
      };

      directFlights = await collection
        .find({
          origin_code: originIATA,
          destination_code: destinationIATA,
          departure: departureFilter,
        })
        .limit(limit)
        .skip(skip)
        .toArray();

      relatedFlights = await collection
        .find({
          $or: [
            { origin_code: originIATA },
            { destination_code: originIATA },
            { origin_code: destinationIATA },
            { destination_code: destinationIATA },
          ],
          departure: departureFilter,
          $nor: [
            { origin_code: originIATA, destination_code: destinationIATA },
          ],
        })
        .limit(limit)
        .skip(skip)
        .toArray();
    }

    const totalFlightsFound = directFlights.length + relatedFlights.length;

    if (totalFlightsFound === 0) {
      directFlights = await collection
        .find({
          origin_code: originIATA,
          destination_code: destinationIATA,
        })
        .limit(limit)
        .skip(skip)
        .toArray();

      relatedFlights = await collection
        .find({
          $or: [
            { origin_code: originIATA },
            { destination_code: originIATA },
            { origin_code: destinationIATA },
            { destination_code: destinationIATA },
          ],
          $nor: [
            { origin_code: originIATA, destination_code: destinationIATA },
          ],
        })
        .limit(limit)
        .skip(skip)
        .toArray();
    }

    const allFlights = [...directFlights, ...relatedFlights];

    return NextResponse.json(
      {
        directFlights,
        relatedFlights,
        allFlights,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[SEARCH_FLIGHTS_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}