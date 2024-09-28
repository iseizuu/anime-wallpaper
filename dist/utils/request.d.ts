import { AxiosResponse } from "axios";
export default class Requested {
    constructor();
    private makeRequest;
    request(uri: string, options: Record<string, unknown>, cookie?: string): Promise<AxiosResponse>;
}
