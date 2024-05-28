"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hoyo_1 = __importDefault(require("../hoyo"));
const request_1 = __importDefault(require("../utils/request"));
const config = __importStar(require("../config"));
class Client {
    constructor() {
        this.get = new request_1.default();
        this.config = config;
    }
    decode(b64) {
        return Buffer.from(b64, "base64").toString("utf8");
    }
    mihoyo() {
        return new hoyo_1.default();
    }
}
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHVyZS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThCO0FBQzlCLCtEQUF5QztBQUN6QyxrREFBb0M7QUFFcEMsTUFBcUIsTUFBTTtJQUd2QjtRQUZPLFFBQUcsR0FBRyxJQUFJLGlCQUFTLEVBQUUsQ0FBQztRQUNiLFdBQU0sR0FBa0IsTUFBTSxDQUFDO0lBRS9DLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBVztRQUNyQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0sTUFBTTtRQUNULE9BQU8sSUFBSSxjQUFPLEVBQUUsQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFiRCx5QkFhQyJ9