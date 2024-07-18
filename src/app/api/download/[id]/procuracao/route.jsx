import { NextResponse } from "next/server";
import ApiProxy from "../../../proxy";

const DJANGO_API_CLIENTES_URL = "http://127.0.0.1:8001/api/clientes/"

export async function GET(request, {params}) {
    const DJANGO_DOWNLOAD_PROCURACAO_URL = `${DJANGO_API_CLIENTES_URL}${params.id}/procuracao/`;
    const {response, status} = await ApiProxy.get_download(DJANGO_DOWNLOAD_PROCURACAO_URL);

    // Check if response is a blob
    if (status === 200) {
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString('base64');
        return NextResponse.json({ base64: base64String }, { status: 200 });
    }

    return NextResponse.json({ error: "Failed to retrieve blob." }, { status });
}