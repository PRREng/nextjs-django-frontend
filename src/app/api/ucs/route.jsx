import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_API_UCS_URL = "http://127.0.0.1:8001/api/ucs/"

export async function GET(request) {
    const {data, status} = await ApiProxy.get(DJANGO_API_UCS_URL, true);
    return NextResponse.json(data, {status: status});
}

export async function POST(request) {
    const requestData = await request.json();
    const {data, status} = await ApiProxy.post(DJANGO_API_UCS_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}