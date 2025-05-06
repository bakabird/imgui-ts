import ModuleInterface from './ModuleInterface';
import WebData from './WebData';
import WebDataFactory from './WebDataFactory';
import WebSocketManager from './WebSocketManager';
import * as ImGui from './imgui';

export default class LevelViewModule implements ModuleInterface {
    name = 'LevelViewModule';

    private isOpen: boolean = false;
    // For Render
    private root: any;

    init() {
        // 模块初始化逻辑
    }

    handleData(data: WebData): void {
        if (data.Type == "funcStateSync") {
            this.isOpen = data.Get("LevelView")
        }
        else if (data.Type == "levelView") {
            var root = data.Get("Root");
            this.root = root
        }
    }


    renderUI(wsMgr: WebSocketManager): void {
        if (this.isOpen) {
            if (ImGui.Button("Stop LevelView")) {
                wsMgr.send(WebDataFactory.OpenFunc("LevelView", false))
                this.isOpen = false
            }
            if (this.root) {
                // {"name":"Lobby","kits":[],"kitNum":0,"childs":[{"name":"0","kits":[],"kitNum":1}]}
                // Render as tree
                if (ImGui.TreeNode(this.root.name)) {
                    for (var i = 0; i < this.root.childs.length; i++) {
                        var child = this.root.childs[i];
                        // As Node
                        if (ImGui.TreeNode(child.name)) {
                            // Render kits
                            for (var j = 0; j < child.kits.length; j++) {
                                var kit = child.kits[j];
                                if (ImGui.Selectable(kit.name)) {
                                }
                            }
                            ImGui.TreePop();
                        }
                    }
                    ImGui.TreePop();
                }
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
