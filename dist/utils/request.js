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
const axios_1 = __importDefault(require("axios"));
const random_useragent_1 = __importDefault(require("random-useragent"));
class Requested {
    constructor() {
    }
    makeRequest(url, queryParams, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            // const proxy = {
            //     host: "83.68.136.236",
            //     port: 80,
            //     protocol: "http"
            // };
            const headers = {
                "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                "User-Agent": random_useragent_1.default.getRandom(), Cookie: cookie !== undefined ? cookie : ""
            };
            const request = yield axios_1.default.get(url, { headers: headers, params: queryParams });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTJDO0FBQzNDLHdFQUF5QztBQUV6QyxNQUFxQixTQUFTO0lBQzFCO0lBQ0EsQ0FBQztJQUVhLFdBQVcsQ0FBQyxHQUFXLEVBQUUsV0FBbUMsRUFBRSxNQUFlOztZQUN2RixrQkFBa0I7WUFDbEIsNkJBQTZCO1lBQzdCLGdCQUFnQjtZQUNoQix1QkFBdUI7WUFDdkIsS0FBSztZQUNMLE1BQU0sT0FBTyxHQUFHO2dCQUNaLFdBQVcsRUFBRSw4RUFBOEU7Z0JBQzNGLFlBQVksRUFBRSwwQkFBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDbEYsQ0FBQztZQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sZUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLE9BQU8sT0FBTyxDQUFFO1FBQ3BCLENBQUM7S0FBQTtJQUVZLE9BQU8sQ0FBQyxHQUFXLEVBQUUsT0FBZ0MsRUFBRSxNQUFlOztZQUMvRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELENBQUM7S0FBQTtDQUNKO0FBckJELDRCQXFCQyJ9