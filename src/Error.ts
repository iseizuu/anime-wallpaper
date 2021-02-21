export default class WallError extends Error {
    public name: string
    public constructor(msg: string) {
        super(msg);
        this.name = "WallError";
    }
}