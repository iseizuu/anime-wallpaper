import Requested from "../utils/request";
import * as config from "../config";
import { hoyolab, hoyoResult } from "../typing";
export default class Client {
    get: Requested;
    readonly config: typeof config;
    constructor();
    decode(b64: string): string;
    mihoyo(query: hoyolab): Promise<hoyoResult>;
}
