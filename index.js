//All tutorial Node.Js code examples are for reference only and shouldn't be used in production code as is. In production, a new new pipedrive.ApiClient() instance should be initialised separately for each request.
const pipedrive = require('pipedrive');
const defaultClient = new pipedrive.ApiClient();

// Configure authorization by settings api key
// PIPEDRIVE_API_KEY is an environment variable that holds real api key
console.log(process.env.PIPEDRIVE_API_KEY);
defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_API_KEY;

async function getDeals() {
    try {
        console.log('Sending request...');

        const api = new pipedrive.DealsApi(defaultClient);

        const response = await api.getDeals();

        console.log('Got deals successfully!', response);
    } catch (err) {
        const errorToLog = err.context?.body || err;

        console.log('Getting deals failed', errorToLog);
    }
}

getDeals();