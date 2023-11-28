import { PrivateChannelDto } from "../PrivateChannel";
import { ServersDto } from "../Servers";
import { UserDto } from "../User";

export interface ReadyEventDto {
    user: UserDto
    private_channels: PrivateChannelDto[]
    servers: ServersDto[]
}