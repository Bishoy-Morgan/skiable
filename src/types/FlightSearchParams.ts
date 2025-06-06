export type FlightSearchParams = {
    travellerCounts: {
        adults: number;
        children: number;
        infantsOnSeat: number;
        infantsOnLap: number;
    };
    tripType: string;
    cabinClass: string;
    whereFrom: string;
    whereTo: string;
    originFlight?: { originIATA: string } | null;
    destinationFlight?: { destinationIATA: string } | null;
    activeField: 'from' | 'to' | null;
    range: { startDate: Date; endDate: Date } | null;
    error: string;
};
