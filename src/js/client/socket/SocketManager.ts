/* eslint-disable @typescript-eslint/no-explicit-any */
import { Settings } from "store/Settings";
import { Payload } from "../../structures/dto/Payload";
import { Client } from "../Client";
import { handlers } from "./handlers/index";
declare const banner: Qml.InfoBanner;

export class SocketManager {
    private isBackground = false;
    constructor(private client: Client) { }

    connect() {
        const [host, port = "80"] = Settings.get("proxyUrl").split(":");
        socket.connectToServer(host, +port);
        window.client.gatewaystatus = true
    }

    ready() {
        socket.messageReceived.connect(msg => {
            this.isBackground ? this.handleBackgroundMessage(msg) : this.handleMessage(msg);
        });
        socket.errors.connect( msg => {
            window.client.gatewaystatus = false
            console.log("Socket error");
            socket.messageReceived.disconnect(msg => {});
            window.client.reconnect = true
            const msgInt: number = parseInt(msg, 10);
            switch (msgInt){
                case 0:
                    banner.text = "ConnectionRefusedError";
                    banner.open();
                break;
                case 1:
                    banner.text = "RemoteHostClosedError";
                    banner.open();
                break;
                case 2:
                    banner.text = "HostNotFoundError";
                    banner.open();
                break;
                case 3:
                    banner.text = "SocketAccessError";
                    banner.open();
                break;
                case 4:
                    banner.text = "SocketResourceError";
                    banner.open();
                break;
                case 5:
                    banner.text = "SocketTimeoutError";
                    banner.open();
                break;
                case 6:
                    banner.text = "DatagramTooLargeError";
                    banner.open();
                break;
                case 7:
                    banner.text = " NetworkError";
                    banner.open();
                break;
                case 8:
                    banner.text = "AddressInUseError";
                    banner.open();
                break;
                case 9:
                    banner.text = "SocketAddressNotAvailableError";
                    banner.open();
                break;
                case 11:
                    banner.text = "UnfinishedSocketOperationError";
                    banner.open();
                break;
                case 13:
                    banner.text = "SslHandshakeFailedError";
                    banner.open();
                break;
                default:
                    banner.text = "other error";
                    banner.open();
                
            }
            
                
        });

    }

    send(payload: Payload) {
        const json = JSON.stringify(payload);
        
        this.client.emit("debug", "Sending payload: " + json);
        socket.send(json);
    }

    setBackground(bg: boolean) {
        this.isBackground = bg;
    }

    private handleBackgroundMessage = (msg: string) => {
        if (msg.indexOf("\"op\":0") !== -1) {
            if (msg.indexOf("\"t\":\"MESSAGE_CREATE\"") !== -1) {
                if (msg.indexOf("\"guild_id\"") === -1 || (
                    this.client.user && (msg.indexOf(this.client.user.id) !== -1)
                )) {
                    this.handleMessage(msg);
                }
            }
        } else {
            this.handleMessage(msg);
        }
    };

    private handleMessage = (msg: string) => {
        try {
            this.client.emit("debug", "Received payload: " + msg);
            this.handlePayload(JSON.parse(msg));
        } catch (e) {
            this.client.emit("error", e as Error);
        }
    };

    private handlePayload(payload: Payload) {
        switch (payload.op) {
            case -1:

            case 0:
                payload.t && handlers[payload.t]?.(this.client, payload as any);
                break;

            case 10:
                handlers.HELLO(this.client, payload as any);
                break;

            case 11:
                handlers.HEARTBEAT_ACK(this.client, payload);
                break;
        }
    }
}
