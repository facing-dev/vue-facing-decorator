import {compatibleMemberDecorator} from '../deco3/utils'
type Creator = { (options: any, key: string): void }
interface Record {
    key: string
    creator: Creator
}

// const CustomDecorators: CustomDecorator[] = []
export const CustomRecords: Record[] = []

export function createDecorator(creator: Creator) {
    return compatibleMemberDecorator(function (proto: any, key: string) {
        CustomRecords.push({
            key,
            creator
        })
    })
}


