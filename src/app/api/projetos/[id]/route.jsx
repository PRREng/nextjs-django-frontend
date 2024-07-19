import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";


const DJANGO_API_PROJETOS_URL = `${DJANGO_API_ENDPOINT}/projetos/`;

export async function PUT(request, {params}) {
    const UPDATE_PROJETO_API_URL = `${DJANGO_API_PROJETOS_URL}${params.id}/`;
    const requestData = await request.json();
    const {data, status} = await ApiProxy.put(UPDATE_PROJETO_API_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}