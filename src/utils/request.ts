import req, { AxiosResponse } from "axios";
import userAgent from "random-useragent";

export default class Requested {
    constructor() {
    }

    private async makeRequest(url: string, queryParams: Record<never, unknown>, cookie?: string): Promise<AxiosResponse> {
        // const proxy = {
        //     host: "83.68.136.236",
        //     port: 80,
        //     protocol: "http"
        // };
        const headers = {
            "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
            "User-Agent": userAgent.getRandom() as string, Cookie: cookie !== undefined ? cookie : ""
        };
        const request = await req.get(url, { headers: headers, params: queryParams });
        return request ;
    }

    public async request(uri: string, options: Record<string, unknown>, cookie?: string): Promise<AxiosResponse> {
        return await this.makeRequest(uri, options, cookie);
    }
}