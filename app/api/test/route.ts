import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/appwrite';

export async function GET() {
    try {
        const isConnected = await testConnection();
        return NextResponse.json({ 
            success: true, 
            connected: isConnected,
            message: isConnected ? 'Backend is connected!' : 'Failed to connect to backend'
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to connect to Appwrite'
        }, { status: 500 });
    }
} 