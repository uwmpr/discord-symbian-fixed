import { ServerChannelsDto } from "./ServerChannels";


export interface ServersDto {
    id: string
    icon: string
    name: string
    ServerChannels: ServerChannelsDto[]
}