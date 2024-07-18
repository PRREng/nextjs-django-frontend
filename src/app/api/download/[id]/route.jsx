// pages/api/download.js

// const fs = require("fs");
// const path = require("path");

// export default function handler(req, res) {
//     const filePath = path.join(process.cwd(),
//         "public", "next.svg"); // Path to your file
//     // Filename for the downloaded file
//     const fileName = "gfgNextJs.svg";

//     // Check if the file exists
//     if (!fs.existsSync(filePath)) {
//         return res.status(404).send("File not found");
//     }

//     // Define a mapping of file extensions to content types
//     const contentTypeMap = {
//         svg: "image/svg+xml",
//         ico: "image/x-icon",
//         png: "image/png",
//         jpg: "image/jpeg",
//         pdf: "application/pdf",
//         // Add more mappings as needed for other file types
//     };

//     // Get the file extension
//     const fileExtension = fileName.split(".").pop().toLowerCase();

//     // Determine the content type based on the file extension
//     const contentType =
//         contentTypeMap[fileExtension] || "application/octet-stream";

//     // Set headers to force download
//     res.setHeader("Content-Disposition",
//         `attachment; filename="${fileName}"`);
//     res.setHeader("Content-Type", contentType);

//     // Stream the file
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
// };

import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";

const DJANGO_API_CLIENTES_URL = "http://127.0.0.1:8001/api/clientes/"

export async function GET(request, {params}) {
    const DJANGO_DOWNLOAD_PROPOSTA_URL = `${DJANGO_API_CLIENTES_URL}${params.id}/gerar_simples/`;
    const {response, status} = await ApiProxy.get_download(DJANGO_DOWNLOAD_PROPOSTA_URL);
    console.log("RESPONSE FROM THE GET ROUTE.JSX");
    console.log(response);

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

const handleDownload = async () => {

    const DJANGO_GERAR_PROPOSTA_SIMPLES_URL = `http://127.0.0.1:8001/api/clientes/${id}/gerar_simples/`;
    const authToken = getToken();
    if (!authToken) {
      return NextResponse.json({}, {status: 401});
    }

    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    }
    const response = await fetch(DJANGO_GERAR_PROPOSTA_SIMPLES_URL, options);
    if (!response.ok) {
      console.log("Error fetching proposta")
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "proposta.pptx";
    a.click();
    
};

const handleDownloadGFORGEEKS = async () => {
try {
    const response = await axios.get("/api/download", {
        responseType: "blob", // Important for binary data
    });

    // Extract filename from content-disposition header
    const contentDisposition = response.headers["content-disposition"];
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    const fileName = fileNameMatch ? fileNameMatch[1] : "downloadedFile";

    // Create a temporary anchor element to trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    // Setting filename received in response
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadStatus("Downloaded");
} catch (error) {
    console.error("Error downloading file:", error);
    setDownloadStatus("Error downloading");
}
};