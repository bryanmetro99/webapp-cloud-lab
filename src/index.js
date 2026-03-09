const { BlobServiceClient } = require("@azure/storage-blob");


const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "images";

async function listImages() {
    
    if (!connectionString) {
        throw new Error("AZURE_STORAGE_CONNECTION_STRING not found in environment variables");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    console.log("Images in container:");
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(`- ${blob.name}`);
    }
}

listImages().catch(console.error);