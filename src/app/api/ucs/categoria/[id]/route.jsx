import { NextResponse } from "next/server";
import ApiProxy from "../../../proxy";

const DJANGO_API_CATEGORIA_URL = "http://127.0.0.1:8001/api/ucs/categoria/";

export async function GET(request, {params}) {
    const url = `${DJANGO_API_CATEGORIA_URL}${params.id}/`;
    const {data, status} = await ApiProxy.get(url, true);
    return NextResponse.json(data, {status: status});
}

export async function POST(request) {
    const requestData = await request.json();
    const {data, status} = await ApiProxy.post(DJANGO_API_CATEGORIA_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}