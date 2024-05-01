import { MessageAttachmentDto } from "./MessageAttachment";
import { UserDto } from "./User";

export interface MessageDto {
    s: Int16Array
    id: string
    channel_id: string
    guild_id?: string
    author: UserDto
    content: string
    timestamp: string
    edited_timestamp: string | null
    mentions: UserDto[]
    attachments: MessageAttachmentDto[]
}