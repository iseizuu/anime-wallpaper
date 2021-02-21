interface searchOpt {
    search: string;
    page: string | number;
}
export default class Wallpaper {
    get(title: searchOpt): Promise<unknown>;
}
export {};
