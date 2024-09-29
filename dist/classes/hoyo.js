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
const typing_1 = require("../typing");
const client_1 = __importDefault(require("../structure/client"));
const error_1 = __importDefault(require("../utils/error"));
class Hoyolab {
    constructor() {
        this.client = new client_1.default();
    }
    /**
     * Retrieves the post list from Hoyolab.
     * @param {hoyolab} options - Options for retrieving the post list.
     * @returns {Promise<hoyoResult>} - A Promise that resolves to the hoyoResult object containing the post data.
     * @throws {AnimeWallError} - If result is empty or error.
     */
    getHoyoArt(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.game)
                throw new error_1.default("Please provide the game you want to search");
            const game = typing_1.hoyolabGames[options.game];
            if (!Object.values(typing_1.hoyolabGames).includes(game))
                throw new error_1.default("Please provide a valid game");
            let postType = typing_1.hoyolabPostType[options.postType];
            if (!Object.values(typing_1.hoyolabPostType).includes(postType))
                postType = typing_1.hoyolabPostType.Trending;
            const url = this.client.decode("aHR0cHM6Ly9iYnMtYXBpLW9zLmhveW9sYWIuY29tL2NvbW11bml0eS9wYWludGVyL3dhcGkvY2hhbm5lbC9wb3N0L2xpc3Q=");
            return new Promise((resolve, reject) => {
                this.client.get.request(`${url}${postType}`, {
                    gids: game,
                    channel_id: this.client.config.channelID[game],
                    page_size: 30
                })
                    .then(x => {
                    const result = x.data;
                    if (!result)
                        throw new error_1.default("Request Failed!");
                    if (!result.data.list)
                        throw new error_1.default("Request is successful but no post found, please check the example request in the README.md");
                    resolve(result);
                })
                    .catch((er) => reject(new error_1.default(er.message)));
            });
        });
    }
}
exports.default = Hoyolab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG95by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL2hveW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNkY7QUFDN0YsaUVBQXlDO0FBQ3pDLDJEQUE0QztBQUU1QyxNQUFxQixPQUFPO0lBRXhCO1FBRFEsV0FBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNVLFVBQVUsQ0FBQyxPQUEyQjs7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUFFLE1BQU0sSUFBSSxlQUFjLENBQUMsNENBQTRDLENBQUMsQ0FBQztZQUUxRixNQUFNLElBQUksR0FBRyxxQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFBRSxNQUFNLElBQUksZUFBYyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDekcsSUFBSSxRQUFRLEdBQUcsd0JBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsUUFBUSxHQUFHLHdCQUFlLENBQUMsUUFBUSxDQUFDO1lBQzVGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGtHQUFrRyxDQUFDLENBQUM7WUFFbkksT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLFFBQVEsRUFBRSxFQUFFO29CQUN6QyxJQUFJLEVBQUUsSUFBSTtvQkFDVixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDOUMsU0FBUyxFQUFFLEVBQUU7aUJBQ2hCLENBQUM7cUJBQ0csSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNOLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUE0QixDQUFDO29CQUM5QyxJQUFJLENBQUMsTUFBTTt3QkFBRSxNQUFNLElBQUksZUFBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQUUsTUFBTSxJQUFJLGVBQWMsQ0FBQyw0RkFBNEYsQ0FBQyxDQUFDO29CQUM5SSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsQ0FBQyxFQUFTLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGVBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0o7QUFuQ0QsMEJBbUNDIn0=