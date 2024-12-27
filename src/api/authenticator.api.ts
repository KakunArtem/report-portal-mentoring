import {ApiClient} from './api.client';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {envConfig} from '../configs';

export class AuthenticatorApi {
    private apiClient: ApiClient;
    private token: string | null = null;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public async authenticate(username: string, password: string): Promise<void> {
        const reportPortalUrl: string = envConfig.baseUrl;
        const url = `${reportPortalUrl}uat/sso/oauth/token`;
        const data = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: 'ui',
                password: 'uiman',
            },
        };
        const response: AxiosResponse<{ access_token: string }> = await this.apiClient.post(url, data, config);
        this.token = response.data.access_token;
        this.apiClient.client.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }

    public getToken(): string | null {
        return this.token;
    }
}
