import axios, { AxiosInstance, Method } from 'axios'

export class ApiService {
    private readonly api: AxiosInstance

    constructor() {
        this.api = axios.create({
            baseURL: '/api',
        })
        this.api.defaults.headers.post['Content-Type'] = 'application/json'
    }

    request(method: Method, url: string, data: any) {
        return this.api({
            method,
            url,
            data,
        })
    }
}
