import { NextResponse } from "next/server";
import ApiProxy from "../../../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

const DJANGO_API_CATEGORIA_URL = `${DJANGO_API_ENDPOINT}/ucs/categoria/`;

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