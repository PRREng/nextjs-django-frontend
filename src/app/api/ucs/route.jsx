import { NextResponse } from "next/server";
import ApiProxy from "../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

const DJANGO_API_UCS_URL = `${DJANGO_API_ENDPOINT}/ucs/`;

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

export async function PUT(request) {
    const UPDATE_CLIENT_API_URL = `${DJANGO_API_UCS_URL}${uc_id}/`;
    const requestData = await request.json();
    const {data, status} = await ApiProxy.put(UPDATE_CLIENT_API_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}