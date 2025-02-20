const { Client, Databases } = require("node-appwrite");
const fs = require("fs");

// Initialize Appwrite client
const client = new Client();
const databases = new Databases(client);
const databaseId = "67815687003d660e9537"
client
.setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
.setProject("678155bb0006055c0822") // Your Appwrite project ID
.setKey("standard_2dcbd6926d3e9f2aae07481390ce179839c63aaafc2ee7e483df19b774dbef78ddaa79ddd239428049e560a0374a18d2ac5a5327ccfba4d9cb64ca05fee2e4b5981ddabe4f7b56b1d7534a3dca5eb88bc3bce0f53cc1f882edca3034b0335c16962096934ef9567ec12d798776e8a501531a8bf6e166bddd9acd15e3472365db"); // Your API key

// List of collections and their IDs
const collections = [
{ name: "comments", id: "678ab93d00318ef792f3" },
{ name: "messages", id: "67860034003b6d82a705" },
{ name: "posts", id: "6785dda9002f5899ea61" },
{ name: "suggestions", id: "67844d74003a230a5484" },
{ name: "documents", id: "67844430000f10c04330" },
{ name: "notifications", id: "67843d6f0032be5d92ce" },
{ name: "success_stories", id: "67843461001e89b9c34c" },
{ name: "success_stories_categories", id: "67842ed200163c385a9c" },
{ name: "images", id: "6783eca20033ef82fb43" },
{ name: "document_categories", id: "6783e13b000be68a6e0e" },
{ name: "data", id: "6783d81b001f2018dc34" },
{ name: "videos", id: "67834570003d2da0d498" },
{ name: "sessions", id: "6781629000147423f32a" },
{ name: "users", id: "67815697001070a2e926" },
];

async function fetchCollectionData() {
const allCollectionsData = {};

for (const collection of collections) {
try {
// Fetch collection details
const collectionDetails = await databases.getCollection(databaseId, collection.id);

// Fetch attributes and indexes (if available)
const attributes = await databases.listAttributes(databaseId, collection.id);
const indexes = await databases.listIndexes(databaseId, collection.id);

// Combine the data
allCollectionsData[collection.name] = {
id: collection.id,
name: collectionDetails.name,
attributes: attributes.attributes || [],
indexes: indexes.indexes || [],
};
} catch (error) {
console.error(`Error fetching data for collection ${collection.name}:`, error.message);
}
}

return allCollectionsData;
}

async function saveToFile() {
const data = await fetchCollectionData();

// Save the data to a JSON file
fs.writeFileSync("all-collections.json", JSON.stringify(data, null, 2));
console.log("All collection data saved to all-collections.json");
}

saveToFile();