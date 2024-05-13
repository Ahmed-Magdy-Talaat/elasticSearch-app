const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();
exports.client = new Client({
  node: "https://c45255582e9146daab5a67ef14ae0626.us-central1.gcp.cloud.es.io", // Elasticsearch endpoint
  auth: {
    apiKey: {
      // API key ID and secret
      id: process.env.ES_API_ID,
      api_key: process.env.ES_API_KEY,
    },
  },
});
