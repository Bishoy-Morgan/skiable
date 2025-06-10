import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/src/lib/mongodb'

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json()
        const client = await clientPromise
        const db = client.db()
        const collection = db.collection('contacts')
        await collection.insertOne({ name, email, message, createdAt: new Date() })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}