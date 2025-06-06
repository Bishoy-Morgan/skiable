export interface Flight {
    _id: string;
    id: number;
    price_raw: number;
    price_formatted: string;
    cabin_class: string;
    flight_type: string;
    origin_code: string;
    destination_code: string;
    origin_name: string;
    origin_city: string;
    origin_country: string;
    destination_country: string;
    destination_city: string;
    destination_name: string;
    duration_formatted: string,
    departure: string;
    arrival: string;
    price_raw: number;
    carrier_name: string;
    stop_count: number;
    flight_number: number;
    duration_minutes: number;
    leg_id: string;
    legs: Leg[];
    stopDetails: StopDetails;
}

export interface Leg {
    leg_number: number;
    origin_code: string;
    origin_name: string;
    origin_city: string;
    origin_country: string;
    destination_code: string;
    destination_name: string;
    destination_city: string;
    destination_country: string;
    departure: string;
    arrival: string;
    duration_minutes: number;
}

export interface StopDetails {
    formatted: string;
    segments: Segment[];
    total_segments: number;
    stops: Stop[];
    total_stops: number;
}

export interface Segment {
    segment_number: number;
    departure: SegmentPoint;
    arrival: SegmentPoint;
    duration: SegmentDuration;
}

export interface SegmentPoint {
    time: string;
    time_24h: string;
    datetime: string;
    airport: Airport;
}

export interface SegmentDuration {
    minutes: number;
    formatted: string;
}

export interface Stop {
    stop_number: number;
    airport: Airport;
    arrival_time: string;
    arrival_datetime: string;
    layover_before: boolean;
}

export interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}
