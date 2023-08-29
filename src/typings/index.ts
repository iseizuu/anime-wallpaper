export interface dataImageFormat {
    title?: string,
    thumbnail?: string,
    image?: string,
}

export interface searchOpt {
    title: string,
    page: string | number,
    type: "sfw" | "sketchy" | "both"
}