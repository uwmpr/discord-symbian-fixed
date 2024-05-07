import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

export function GATEWAY_CONNECT(client: Client, { d: data }: Payload) {
    client.gatewaystatus = true;
    return null;
}