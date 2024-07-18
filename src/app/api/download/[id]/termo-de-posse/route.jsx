import { NextResponse } from "next/server";
import ApiProxy from "../../../proxy";

const DJANGO_API_CLIENTES_URL = "http://127.0.0.1:8001/api/clientes/"

export async function GET(request, {params}) {
    const DJANGO_DOWNLOAD_TERMO_URL = `${DJANGO_API_CLIENTES_URL}${params.id}/termo-de-posse/`;
    const {response, status} = await ApiProxy.get_download(DJANGO_DOWNLOAD_TERMO_URL);
    // console.log("RESPONSE FROM THE GET ROUTE.JSX");
    // console.log(response);

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