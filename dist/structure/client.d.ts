import Requested from "../utils/request";
import * as config from "../config";
import { hoyolabSearchQuery, hoyolabResult } from "../typing";
export default class Client {
    get: Requested;
    readonly config: typeof config;
    constructor();
    decode(b64: string): string;
    mihoyo(query: hoyolabSearchQuery): Promise<hoyolabResult>;
}
