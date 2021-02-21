export default class AnimeWallError extends Error {
    public name: string
    public constructor(public msg: string) {
        super(msg);
        this.name = "AnimeWallError";
    }
}