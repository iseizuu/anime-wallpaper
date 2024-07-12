export default class AnimeWallError extends Error {
    public name: string;
    public constructor(public message: string) {
        super(message);
        this.name = "AnimeWallError";
    }
}