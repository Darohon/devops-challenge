
const express = require('express');
const pipedrive = require('pipedrive');

const expressApp = express();

const defaultClient = new pipedrive.ApiClient();
const api = new pipedrive.DealsApi(defaultClient);
    
defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_API_KEY;

expressApp.listen(3000, () => {
    console.log('cool beans');
});

expressApp.get('/deals', async function (req, res) {
    res.send(await getDeals());
});

expressApp.post('/deals', async function (req, res) {
    res.send(await addDeal(req.query.title, req.query.value, req.query.currency, req.query.user_id, req.query.person_id, req.query.org_id, req.query.stage_id,
        req.query.status, req.query.expected_close_date, req.query.probability, req.query.lost_reason, req.query.visible_to, req.query.add_time));
});

// expressApp.get('/metrics', (req, res) => {

// });

class Deal {
    constructor(title, value, currency, user_id, person_id, org_id, stage_id, status, expected_close_date, probability, lost_reason, visible_to, add_time) {
        this.title = title;
        this.value = value;
        this.currency = currency;
        this.user_id = user_id;
        this.person_id = person_id;
        this.org_id = org_id;
        this.stage_id = stage_id;
        this.status = status;
        this.expected_close_date = expected_close_date;
        this.probability = probability;
        this.lost_reason = lost_reason;
        this.visible_to = visible_to;
        this.add_time = add_time;
    }
}

async function getDeals() {
    try {
        console.log('Sending GET request...');

        const response = await api.getDeals();

        console.log('Got deals successfully!', response);

        console.log(response.success);

        return response;

    } catch (err) {
        const errorToLog = err.context?.body || err;

        console.log('Getting deals failed', errorToLog);

        return 'Getting deals failed';
    }
}

async function addDeal(title, value, currency, user_id, person_id, org_id, stage_id, status, expected_close_date, probability, lost_reason, visible_to, add_time) {
    try {
        console.log('Sending POST request...');

        const data = new Deal(title, value, currency, user_id, person_id, org_id, stage_id, status, expected_close_date, probability, lost_reason, visible_to, add_time);

        const response = await api.addDeal(data);

        console.log('Deal was added successfully!', response);
    } catch (err) {
        const errorToLog = err.context?.body || err;

        console.log('Adding failed', errorToLog);
    }
}

async function updateDeal() {
    try {
        console.log('Sending PUT request...');

        const DEAL_ID = 1;  // id of the deal you want to update
        const data = {
            title: 'Deal of the century',
            value: 20000,
            currency: 'EUR',
            user_id: null,
            person_id: null,
            org_id: 1,
            stage_id: 2,
            status: 'open',
            expected_close_date: '2022-03-11',
            lost_reason: null,
            visible_to: 1,
        }
        const response = await api.updateDeal(DEAL_ID, data);

        console.log(`Deal updated successfully!`, response);
    } catch (err) {
        const errorToLog = err.context?.body || err;

        console.log('Deal update failed', errorToLog);
    }
}

module.exports = getDeals;

// addDeal('Deal of the century', 10000, 'USD', null, null, 1, 1, 'open', '2022-02-11', 60, null, 1, '2021-02-11');