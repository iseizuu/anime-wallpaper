export default class AnimeWallError extends Error {
    message: string;
    name: string;
    constructor(message: string);
}
