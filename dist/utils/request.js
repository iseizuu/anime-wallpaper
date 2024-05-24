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
    makeRequest(url, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = { "user-agent": random_useragent_1.default.getRandom() };
            const request = yield node_superfetch_1.default.get(url).query(queryParams).set(headers);
            return request;
        });
    }
    request(uri, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest(uri, options);
        });
    }
}
exports.default = Requested;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQWtDO0FBQ2xDLHdFQUF5QztBQUV6QyxNQUFxQixTQUFTO0lBQzFCO0lBQ0EsQ0FBQztJQUVhLFdBQVcsQ0FBQyxHQUFXLEVBQUUsV0FBbUM7O1lBQ3RFLE1BQU0sT0FBTyxHQUFHLEVBQUUsWUFBWSxFQUFFLDBCQUFTLENBQUMsU0FBUyxFQUFZLEVBQUUsQ0FBQztZQUNsRSxNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkUsT0FBTyxPQUE4QixDQUFDO1FBQzFDLENBQUM7S0FBQTtJQUVZLE9BQU8sQ0FBQyxHQUFXLEVBQUUsT0FBZ0M7O1lBQzlELE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQUE7Q0FDSjtBQWJELDRCQWFDIn0=