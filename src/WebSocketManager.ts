import Sockette from 'sockette';
import WebData from './WebData';

class WebSocketManager {
    private ws: Sockette;
    private messageHandlers: ((data: any) => void)[] = [];
    private readyState: number = WebSocket.CONNECTING;
    private onOpen: () => void;

    constructor(url: string) {
        this.ws = new Sockette(url, {
            timeout: 5e3,
            maxAttempts: 10,
            onmessage: (event) => {
                console.log('Received message:', event.data);
                this.messageHandlers.forEach(handler => handler(event.data));
            },
            onopen: (e: Event) => {
                console.log('Successfully connected', e)
                this.readyState = WebSocket.OPEN
                this.onOpen && this.onOpen();
            },
            onreconnect: (e: Event) => {
                console.log('Reconnecting...', e)
                this.readyState = WebSocket.CONNECTING;
            },
            onmaximum: (e: Event) => {
                console.log('Stop Attempting!', e)
                this.readyState = WebSocket.CLOSED;
            },
            onclose: (e: Event) => {
                console.log('Connection closed', e)
                this.readyState = WebSocket.CLOSED;
            },
            onerror: (e: Event) => {
                console.log('Error:', e)
                this.readyState = WebSocket.CLOSED;
            }
        });
    }

    setOnOpen(handler: () => void) {
        this.onOpen = handler;
    }

    addMessageHandler(handler: (data: any) => void) {
        this.messageHandlers.push(handler);
    }

    send(webData: WebData) {
        if (this.isConnectionOpen()) {
            this.ws.send(webData.toJsonString());
        } else {
            console.warn('WebSocket connection is not open. Cannot send data.');
        }
    }

    // 判断连接是否打开
    isConnectionOpen(): boolean {
        return this.readyState === WebSocket.OPEN;
    }

    // 关闭连接
    close() {
        this.ws.close();
    }
}

export default WebSocketManager;
