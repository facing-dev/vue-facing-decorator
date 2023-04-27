type Creator = { (options: any, key: string): void };
export interface CustomDecorator {
    key: string;
    creator: Creator;
}

export function createDecorator(creator: Creator) {
    return function (proto: any, key: string) {
        const Ctor = typeof proto === 'function' ? proto : proto.constructor;
        if (!Ctor.__d) {
            Ctor.__d = [];
        }

        Ctor.__d.push({key, creator});
    };
}
