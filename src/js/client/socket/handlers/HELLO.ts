import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";
declare const banner: Qml.InfoBanner;

export type HelloData = {
    heartbeat_interval: number
};

export function HELLO(client: Client, { d: data }: Payload<HelloData>) {
    if (!data) {
        throw new Error("No data provided to the handler.");
    }
    if(window.client.reconnect){ 
        client.ws.send({
            op: 6,
            d: {
                token: client.token,
                session_id: client.session_id,
                seq: client.seq
            }

        });
        window.client.reconnect = false;
    banner.text = `<b>TCP socket</b><br /> reconnected`;
    }else{
        client.ws.send({
            op: 2,
            d: {
                token: client.token,
                capabilities: 1,
                properties: {
                    "$os": "Symbian^3",
                    "$browser": "discord-symbian",
                    "$device": "Nokia E7-00",
                },
            },
        });
    
    banner.open();
    }
    window.client.reconnect = false;

    socket.errors.disconnect( msg => {});


    setInterval(() => {
        client.ws.send({
            op: 1,
            d: null,
        });
    }, data.heartbeat_interval);
}