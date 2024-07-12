"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const random_useragent_1 = __importDefault(require("random-useragent"));
class Requested {
    constructor() {
    }
    makeRequest(url, queryParams, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                "User-Agent": random_useragent_1.default.getRandom(),
                cookie: cookie !== undefined ? cookie : ""
            };
            const request = yield node_superfetch_1.default.get(url).query(queryParams).set(headers);
            return request;
        });
    }
    request(uri, options, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(uri, options, cookie);
        });
    }
}
exports.default = Requested;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQWtDO0FBQ2xDLHdFQUF5QztBQUV6QyxNQUFxQixTQUFTO0lBQzFCO0lBQ0EsQ0FBQztJQUVhLFdBQVcsQ0FBQyxHQUFXLEVBQUUsV0FBbUMsRUFBRSxNQUFlOztZQUN2RixNQUFNLE9BQU8sR0FBRztnQkFDWixXQUFXLEVBQUUsOEVBQThFO2dCQUMzRixZQUFZLEVBQUUsMEJBQVMsQ0FBQyxTQUFTLEVBQVk7Z0JBQUUsTUFBTSxFQUFFLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTthQUM1RixDQUFDO1lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSx5QkFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25FLE9BQU8sT0FBOEIsQ0FBQztRQUMxQyxDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsR0FBVyxFQUFFLE9BQWdDLEVBQUUsTUFBZTs7WUFDL0UsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7Q0FDSjtBQWhCRCw0QkFnQkMifQ==