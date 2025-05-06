import ModuleInterface from './ModuleInterface';
import WebData from './WebData';
import WebDataFactory from './WebDataFactory';
import WebSocketManager from './WebSocketManager';
import imgui, * as ImGui from './imgui';

export default class ConsoleModule implements ModuleInterface {
    name = 'ConsoleModule';

    private isOpen: boolean = false; // 功能默认开启
    private logs: string[] = []; // 存储日志信息
    private isFirstOpen: boolean = true; // 标记是否是第一次打开

    init() {
        // 模块初始化逻辑
    }

    handleData(data: WebData): void {
        if (data.Type == "funcStateSync") {
            this.isOpen = data.Get("Console")
        }
        else if (data.Type == "consoleLog") {
            if (this.isOpen) {
                const log = data.Get("")
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
            else {
                ImGui.Begin(this.name);
                if (this.isFirstOpen) {
                    // 设置窗口大小
                    ImGui.SetWindowSize(this.name, new ImGui.Vec2(600, 300));
                    // 设置位置
                    ImGui.SetWindowPos(this.name, new ImGui.Vec2(0, 500));
                    this.isFirstOpen = false;
                }
                // 显示日志
                // ImGui.BeginChild("ConsoleLog");
                for (const log of this.logs) {
                    ImGui.Text(log);
                }
                // ImGui.EndChild();
                ImGui.End();
            }
        } else {
            if (ImGui.Button("Open Console")) {
                wsMgr.send(WebDataFactory.OpenFunc("Console", true));
                this.isOpen = true;
            }
        }
    }
}
