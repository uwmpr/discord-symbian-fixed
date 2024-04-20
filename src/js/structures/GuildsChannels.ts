import { Client } from "client/Client";
import { GuildChannelsDto } from "./dto/GuildChannels";

export class GuildsChannels {
    name!: string
    last_message_id!: string
    id!: string
    constructor(private client: Client, dto: GuildChannelsDto) {
        this._patch(dto);
    }
    private _patch(data: GuildChannelsDto) {
        this.id = data.id;
        this.name = data.name
        this.last_message_id = data.last_message_id
    }
}