import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {envConfig, logger} from '../configs';

export class ApiClient {
    public client: AxiosInstance;

    constructor(baseURL: string = envConfig.baseUrl) {
        this.client = axios.create({baseURL});

        this.client.interceptors.request.use(
            (config) => {
                logger.debug(`Request: ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                logger.error(`Request error: ${error.message}`);
                return error;
            }
        );

        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                logger.debug(`Response: ${response.status} ${response.statusText}`);
                return response;
            },
            (error) => {
                logger.error(`Response error: ${error.message}`);
                return error;
            }
        );
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.patch<T>(url, data, config);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }
}
