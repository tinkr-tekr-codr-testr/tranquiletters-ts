import { NUM_PARAMS } from "./parameters"

export interface NumActionPayload{
    name: NUM_PARAMS,
    val: number
}

export interface TokensActionPayload {
    type: 'Tokens',
    name:string,
    val:string[]
}

export interface NameActionPayload {
    type: 'Name',
    oldName: string,
    newName: string,
    val: string

}
