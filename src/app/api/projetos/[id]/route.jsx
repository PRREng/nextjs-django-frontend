import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";


const DJANGO_API_PROJETOS_URL = "http://127.0.0.1:8001/api/projetos/";

export async function PUT(request, {params}) {
    const UPDATE_PROJETO_API_URL = `${DJANGO_API_PROJETOS_URL}${params.id}/`;
    const requestData = await request.json();
    const {data, status} = await ApiProxy.put(UPDATE_PROJETO_API_URL, 
        requestData, true);
    return NextResponse.json(data, {status: status});
}