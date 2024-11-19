export type Endpoint = {
    route: string;
    name: string;
    type: string;
}

export type File = {
    handleRequest: Function;
}