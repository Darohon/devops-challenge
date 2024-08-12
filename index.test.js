const express = require('express');
const pipedrive = require('pipedrive');
const getDeals = require('./index');
const expressApp = express();

test('fetch deals', async function () {
    res = await getDeals();
    expect(res.success).toBe("true")
});

// const defaultClient = new pipedrive.ApiClient();
// const api = new pipedrive.DealsApi(defaultClient);
    
// // Configure authorization by settings api key
// // PIPEDRIVE_API_KEY is an environment variable that holds real api key
// defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_API_KEY;

// expressApp.listen(3000, () => {
//     console.log('cool beans');
// });

// expressApp.get('/deals', async function (req, res) {
//     res.send(await getDeals());
// });

// // expressApp.post('/deals', async function (req, res) {
// //     res.send(await addDeal(req.query.title, req.query.value, req.query.currency, req.query.user_id, req.query.person_id, req.query.org_id, req.query.stage_id,
// //         req.query.status, req.query.expected_close_date, req.query.probability, req.query.lost_reason, req.query.visible_to, req.query.add_time));
// // });