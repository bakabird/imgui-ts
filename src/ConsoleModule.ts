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
                    wsMgr.send(WebDataFactory.PullLogs());
                    this.isFirstOpen = false;
                }
                // 日志和输入框垂直布局；并且输入框贴底，其余空间给日志；且需要自适应窗口变化
                // 获取当前窗口的可用区域
                const availRegion = ImGui.GetContentRegionAvail();
                // 计算输入框的高度，这里假设输入框高度为 25 像素
                const inputHeight = 25;
                // 计算日志区域的高度
                const logHeight = availRegion.y - inputHeight;

                // 显示日志
                ImGui.BeginChild("ConsoleLog", new ImGui.Vec2(0, logHeight), true);
                for (const log of this.logs) {
                    ImGui.Text(log);
                }
                ImGui.EndChild();

                // 模拟 ImGui::InputText 函数调用
                var strBuffer = new ImGui.ImStringBuffer(100);
                ImGui.InputText("", strBuffer, 128);
                // 模拟在同一行显示内容
                ImGui.SameLine();

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
