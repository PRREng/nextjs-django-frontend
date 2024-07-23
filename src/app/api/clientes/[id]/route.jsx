import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

const DJANGO_API_CLIENTE_URL = `${DJANGO_API_ENDPOINT}/clientes/`;

// get the client details
export async function GET(request, {params}) {
    // console.log(`Request ID: ${params.id}`);
    const DJANGO_API_CLIENT_DETAIL_URL = `${DJANGO_API_CLIENTE_URL}${params.id}/`;
    const {data, status} = await ApiProxy.get(DJANGO_API_CLIENT_DETAIL_URL, true);
    // console.log(`Status from Proxy: ${status}`);
    return NextResponse.json(data, {status: status});
}

export async function POST(request) {
    const requestData = await request.json();
    const {data, status} = await ApiProxy.post(DJANGO_API_CLIENTE_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}

export async function PUT(request, {params}) {
    const UPDATE_CLIENT_API_URL = `${DJANGO_API_CLIENTE_URL}${params.id}/`;
    const requestData = await request.json();
    const {data, status} = await ApiProxy.put(UPDATE_CLIENT_API_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}

export async function DELETE(request, {params}) {
    const UPDATE_CLIENT_API_URL = `${DJANGO_API_CLIENTE_URL}${params.id}/`;
    const requestData = await request.json();
    const {data, status} = await ApiProxy.delete(UPDATE_CLIENT_API_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}