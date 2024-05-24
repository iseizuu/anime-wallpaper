import req from "node-superfetch";
import userAgent from "random-useragent";

export default class Requested {
    constructor() {
    }

    private async makeRequest(url: string, queryParams: Record<never, unknown>): Promise<Response> {
        const headers = { "user-agent": userAgent.getRandom() as string };
        const request = await req.get(url).query(queryParams).set(headers);
        return request as unknown as Response;
    }

    public async request(uri: string, options: Record<string, unknown>): Promise<Response> {
        return await this.makeRequest(uri, options);
    }
}