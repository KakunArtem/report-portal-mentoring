import {ApiClient} from './api.client';
import {envConfig} from '../configs';

export class LaunchesApi {
    private apiClient: ApiClient;
    private baseUrl: string = `api/v1/${envConfig.projectName}/launch`;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public async getLaunches(params?: Record<string, any>) {
        return this.apiClient.get(this.baseUrl, {
            params,
        });
    }

    public async launchCluster(data: any) {
        return this.apiClient.post(`${this.baseUrl}/cluster`, data);
    }

    public async launchInfo(data: any) {
        return this.apiClient.put(`${this.baseUrl}/info`, data);
    }
}
