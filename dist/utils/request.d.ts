export default class Requested {
    constructor();
    private makeRequest;
    request(uri: string, options: Record<string, unknown>): Promise<Response>;
}
