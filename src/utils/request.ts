import req from "node-superfetch";
import userAgent from "random-useragent";

export default class Requested {
    constructor() {
    }

    private async makeRequest(url: string, queryParams: Record<never, unknown>, cookie?: string): Promise<Response> {
        const headers = {
            "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
            "User-Agent": userAgent.getRandom() as string, cookie: cookie !== undefined ? cookie : ""
        };
        const request = await req.get(url).query(queryParams).set(headers);
        return request as unknown as Response;
    }

    public async request(uri: string, options: Record<string, unknown>, cookie?: string): Promise<Response> {
        return await this.makeRequest(uri, options, cookie);
    }
}