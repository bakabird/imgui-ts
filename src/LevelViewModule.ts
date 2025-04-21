import ModuleInterface from './ModuleInterface';
import WebData from './WebData';
import WebDataFactory from './WebDataFactory';
import WebSocketManager from './WebSocketManager';
import * as ImGui from './imgui';

export default class LevelViewModule implements ModuleInterface {
    name = 'LevelViewModule';

    private stable: boolean = false
    private isOpen: boolean = false;

    init() {
        // 模块初始化逻辑
    }

    handleData(data: WebData): void {
        if (data.Type == "levelView") {
            if (!this.stable) {
                this.isOpen = true
                this.stable = true
            }
        }
    }


    renderUI(wsMgr: WebSocketManager): void {
        if (this.isOpen) {
            if (ImGui.Button("Stop LevelView")) {
                wsMgr.send(WebDataFactory.OpenFunc("LevelView", false))
                this.isOpen = false
            }
        }
        else {
            if (ImGui.Button("Open LevelView")) {
                wsMgr.send(WebDataFactory.OpenFunc("LevelView", true))
                this.isOpen = true
            }
        }
    }
}
