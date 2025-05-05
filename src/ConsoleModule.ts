import ModuleInterface from './ModuleInterface';
import WebData from './WebData';
import WebDataFactory from './WebDataFactory';
import WebSocketManager from './WebSocketManager';
import * as ImGui from './imgui';

export default class ConsoleModule implements ModuleInterface {
    name = 'ConsoleModule';

    private isOpen: boolean = true; // 功能默认开启
    private logs: string[] = []; // 存储日志信息

    init() {
        // 模块初始化逻辑
    }

    handleData(data: WebData): void {
        if (data.Type == "consoleLog") {
            if (this.isOpen) {
                const log = data.Get("Log");
                if (log) {
                    this.logs.push(log);
                }
            }
        }
    }

    renderUI(wsMgr: WebSocketManager): void {
        if (this.isOpen) {
            if (ImGui.Button("Close Console")) {
                wsMgr.send(WebDataFactory.OpenFunc("Console", false));
                this.isOpen = false;
                this.logs = []; // 清空日志
            }
            // 显示日志
            ImGui.BeginChild("ConsoleLog");
            for (const log of this.logs) {
                ImGui.Text(log);
            }
            ImGui.EndChild();
        } else {
            if (ImGui.Button("Open Console")) {
                wsMgr.send(WebDataFactory.OpenFunc("Console", true));
                this.isOpen = true;
            }
        }
    }
}
