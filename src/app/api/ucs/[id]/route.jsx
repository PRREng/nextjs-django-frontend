import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";


const DJANGO_API_UCS_URL = `${DJANGO_API_ENDPOINT}/ucs/`;
export async function GET(request, {params}) {
    const UCS_LIST_URL = `${DJANGO_API_UCS_URL}${params.id}/`
    const {data, status} = await ApiProxy.get(UCS_LIST_URL, true);
    return NextResponse.json(data, {status: status});
}