import { NextResponse } from "next/server";
import ApiProxy from "../../../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

const DJANGO_API_CLIENTES_URL = `${DJANGO_API_ENDPOINT}/clientes/`;

export async function GET(request, {params}) {
    const DJANGO_DOWNLOAD_CONTRATO_URL = `${DJANGO_API_CLIENTES_URL}${params.id}/contrato/`;
    const {response, status} = await ApiProxy.get_download(DJANGO_DOWNLOAD_CONTRATO_URL);

    // Check if response is a blob
    if (status === 200) {
        const blob = await response.blob();
        // const blobUrl = URL.createObjectURL(blob); // Create a URL for the blob
        const arrayBuffer = await blob.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString('base64');
        return NextResponse.json({ base64: base64String }, { status: 200 });
    }

    return NextResponse.json({ error: "Failed to retrieve blob." }, { status });
}