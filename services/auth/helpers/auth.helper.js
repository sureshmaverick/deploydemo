require('dotenv').config();

const axios = require('axios');

const TOKEN = process.env.OKTA_API_TOKEN;
const API_URL = `${process.env.OKTA_ORG_URL}/api/v1/users?activate=true`;

const createUserOnOkta = async (body) => {
    const data = {
        profile: {
            firstName: body?.firstName,
            lastName: body?.lastName,
            email: body?.email,
            login: body?.email,
        },
        credentials: {
            password: { value: body?.password }
        }
    };

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `SSWS ${TOKEN}`
    };

    try {
        let response = await axios.post(API_URL, data, { headers: headers });
        response = response?.data;
        if (response?.errorCode) {
            return {
                error: true,
                message: response?.errorCauses,
                statusCode: 400
            };
        } else {
            return {
                error: false,
                message: 'user created successfully',
                statusCode: 200,
                userProfile: response
            };
        }
    } catch (err) {
        return {
            errorCode: err?.response?.data?.errorCode,
            errorSummary: err?.response?.data?.errorCauses?.[0]?.errorSummary,
            statusCode: err?.response?.status || 400
        };
    }
};

module.exports = {
    createUserOnOkta
};
