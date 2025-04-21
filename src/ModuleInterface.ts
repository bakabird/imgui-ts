import WebData from "./WebData";
import WebSocketManager from "./WebSocketManager";

interface ModuleInterface {
    name: string;
    init(): void;
    handleData(data: WebData): void;
    renderUI(wsMgr: WebSocketManager): void;
}

export default ModuleInterface;
