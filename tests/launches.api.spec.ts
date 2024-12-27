import {expect, test} from '@playwright/test';
import {ApiClient} from '../src/api/api.client';
import {AuthenticatorApi, LaunchesApi} from '../src/api';
import {envConfig} from '../src/configs';
import {generateRandomId} from "../src/utils/number.utils";


test.describe('Launches Api', () => {
    let authenticator: AuthenticatorApi;
    let launchesApi: LaunchesApi;

    test.beforeAll(async () => {
        const apiClient = new ApiClient();
        launchesApi = new LaunchesApi(apiClient);
        authenticator = new AuthenticatorApi(apiClient);
        await authenticator.authenticate(envConfig.username, envConfig.password);
    });

    test('should return an expected number of elements. GET request', async () => {
        const params = {'page.size': 1};
        const response: any = await launchesApi.getLaunches(params);
        expect(response.data.content.length).toEqual(1);
        expect(response.data.page.number).toEqual(1);
    });

    test('should return an error for an invalid parameter value. GET request', async () => {
        const params = {'page.size': false};
        const response: any = await launchesApi.getLaunches(params);
        expect(response.status).toEqual(500);
        expect(response.message).toEqual('Request failed with status code 500');
    });

    test('should start clusters generation. POST request', async () => {
        const launchId = 1;
        const params = {
            "launchId": launchId,
            "removeNumbers": true
        };
        const response: any = await launchesApi.launchCluster(params);
        expect(response.status).toEqual(200);
        expect(response.data.message).toEqual(`Clusters generation for launch with ID=\'${launchId}\' started.`);
    });

    test('should return Not found with invalid id. POST request', async () => {
        const launchId = 0;
        const params = {
            "launchId": launchId,
            "removeNumbers": true
        };
        const response: any = await launchesApi.launchCluster(params);
        expect(response.status).toEqual(404);
        expect(response.response.data.message).toEqual(`Launch '${0}' not found. Did you use correct Launch ID?`);
    });

    test('should return Bad Request with empty body. POST request', async () => {
        const params = {};
        const response: any = await launchesApi.launchCluster(params);
        expect(response.status).toEqual(400);
        expect(response.response.data.message).toEqual('Incorrect Request. [Field \'launchId\' should not be null.] ');
    });

    test('should update attributes successfully. PUT request', async () => {
        const randomId = generateRandomId()

        const params = {
            "ids": [
                randomId
            ],
            "description": {
                "comment": "string",
                "action": "CREATE"
            },
            "attributes": [
                {
                    "from": {
                        "key": "string",
                        "value": "string"
                    },
                    "to": {
                        "key": "string",
                        "value": "string"
                    },
                    "action": "CREATE"
                }
            ]
        };
        const response: any = await launchesApi.launchInfo(params);
        expect(response.status).toEqual(200);
        expect(response.data.message).toEqual('Attributes successfully updated');
    });

    test('should return Bad Request with invalid id. PUT request', async () => {
        const params = {
            "ids": [
                "invalid"
            ],
            "description": {
                "comment": "string",
                "action": "CREATE"
            },
            "attributes": [
                {
                    "from": {
                        "key": "string",
                        "value": "string"
                    },
                    "to": {
                        "key": "string",
                        "value": "string"
                    },
                    "action": "CREATE"
                }
            ]
        };
        const response: any = await launchesApi.launchInfo(params);
        expect(response.status).toEqual(400);
    });
});
