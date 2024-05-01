import { GuildChannelsDto } from "../GuildChannels";
import { GuildsDto } from "../Guilds";
import { PrivateChannelDto } from "../PrivateChannel";
import { UserDto } from "../User";

export interface ReadyEventDto {
    user: UserDto
    private_channels: PrivateChannelDto[]
    guilds: GuildsDto[]
    session_id: string
}