import Hoyolab from "../hoyo";
import Requested from "../utils/request";
import * as config from "../config";

export default class Client {
    public get = new Requested();
    public readonly config: typeof config = config;
    public constructor() {
    }

    public decode(b64: string): string {
        return Buffer.from(b64, "base64").toString("utf8");
    }

    public mihoyo(): Hoyolab {
        return new Hoyolab();
    }
}

