import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_API_UCS_URL = "http://127.0.0.1:8001/api/ucs/";

export async function PUT(request, {params}) {
    const UPDATE_CLIENT_API_URL = `${DJANGO_API_UCS_URL}${params.id}/`;
    const requestData = await request.json();
    const {data, status} = await ApiProxy.put(UPDATE_CLIENT_API_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}