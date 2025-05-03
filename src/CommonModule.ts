import ModuleInterface from './ModuleInterface';
import WebData from './WebData';
import WebDataFactory from './WebDataFactory';
import WebSocketManager from './WebSocketManager';
import * as ImGui from './imgui';

export default class CommonModule implements ModuleInterface {
    name = 'CommonModule';


    init() {
        // 模块初始化逻辑
    }

    handleData(data: WebData): void {
    }


    renderUI(wsMgr: WebSocketManager): void {

        ImGui.TextColored(new ImGui.ImVec4(1.0, 1.0, 0.0, 1.0), "Fast Command");
        if (ImGui.SmallButton("reload")) {
            wsMgr.send(WebDataFactory.RunCommand("r"))
        }
        ImGui.SameLine();
        if (ImGui.SmallButton("back")) {
            wsMgr.send(WebDataFactory.RunCommand("back"))
        }
    }

}
