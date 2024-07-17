import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";

const DJANGO_API_CLIENTE_URL = "http://127.0.0.1:8001/api/clientes/";

// get the client details
export async function GET(request, {params}) {
    // console.log(`Request ID: ${params.id}`);
    const DJANGO_API_CLIENT_DETAIL_URL = `http://127.0.0.1:8001/api/clientes/${params.id}/`;
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