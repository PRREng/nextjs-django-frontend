import { NextResponse } from "next/server";
import ApiProxy from "../../../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

const DJANGO_API_UCS_URL = `${DJANGO_API_ENDPOINT}/ucs/`;

export async function PUT(request, {params}) {
    const UPDATE_CLIENT_API_URL = `${DJANGO_API_UCS_URL}${params.id}/${params.ucid}/`;
    const requestData = await request.json();
    const {data, status} = await ApiProxy.put(UPDATE_CLIENT_API_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}

export async function DELETE(request, {params}) {
    const DELETE_CLIENT_API_URL = `${DJANGO_API_UCS_URL}${params.id}/${params.ucid}/`;
    const requestData = await request.json();
    const {data, status} = await ApiProxy.delete(DELETE_CLIENT_API_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}