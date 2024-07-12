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
const typings_1 = require("./typings");
const client_1 = __importDefault(require("./structure/client"));
const error_1 = __importDefault(require("./utils/error"));
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
            const game = typings_1.hoyoApp[options.game];
            if (!Object.values(typings_1.hoyoApp).includes(game))
                throw new error_1.default("Please provide a valid game");
            let postType = typings_1.hoyoOptions[options.postType];
            if (!Object.values(typings_1.hoyoOptions).includes(postType))
                postType = typings_1.hoyoOptions.Trending;
            const url = this.client.decode("aHR0cHM6Ly9iYnMtYXBpLW9zLmhveW9sYWIuY29tL2NvbW11bml0eS9wYWludGVyL3dhcGkvY2hhbm5lbC9wb3N0L2xpc3Q=");
            return new Promise((resolve, reject) => {
                this.client.get.request(`${url}${postType}`, {
                    gids: game,
                    channel_id: this.client.config.channelID[game],
                    page_size: 30
                })
                    .then(x => {
                    const result = x.body;
                    if (!result)
                        throw new error_1.default("Request Failed!");
                    if (!result.data.list)
                        throw new error_1.default("Request is successful but no post found, please check the example request in the README.md");
                    resolve(result);
                })
                    .catch(er => reject(new error_1.default(er)));
            });
        });
    }
}
exports.default = Hoyolab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG95by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ob3lvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXNFO0FBQ3RFLGdFQUF3QztBQUN4QywwREFBMkM7QUFFM0MsTUFBcUIsT0FBTztJQUV4QjtRQURRLFdBQU0sR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztJQUU5QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxVQUFVLENBQUMsT0FBZ0I7O1lBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFBRSxNQUFNLElBQUksZUFBYyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7WUFFMUYsTUFBTSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsTUFBTSxJQUFJLGVBQWMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3BHLElBQUksUUFBUSxHQUFHLHFCQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUFFLFFBQVEsR0FBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQztZQUNwRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrR0FBa0csQ0FBQyxDQUFDO1lBRW5JLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxRQUFRLEVBQUUsRUFBRTtvQkFDekMsSUFBSSxFQUFFLElBQUk7b0JBQ1YsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzlDLFNBQVMsRUFBRSxFQUFFO2lCQUNoQixDQUFDO3FCQUNHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDTixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBeUIsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLE1BQU07d0JBQUUsTUFBTSxJQUFJLGVBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUFFLE1BQU0sSUFBSSxlQUFjLENBQUMsNEZBQTRGLENBQUMsQ0FBQztvQkFDOUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksZUFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKO0FBbkNELDBCQW1DQyJ9