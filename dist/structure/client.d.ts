import Hoyolab from "../hoyo";
import Requested from "../utils/request";
import * as config from "../config";
export default class Client {
    get: Requested;
    readonly config: typeof config;
    constructor();
    decode(b64: string): string;
    mihoyo(): Hoyolab;
}
