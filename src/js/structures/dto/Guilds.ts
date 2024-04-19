import { GuildChannelsDto } from "./GuildChannels"

export interface GuildsDto {
    name: string
    icon: string
    id: string
    channels: GuildChannelsDto[]
}