import ExampleModule from "./ExampleModule";
import HelloModule from "./HelloModule";
import imgui, * as ImGui from "./imgui"
import * as ImGui_Impl from "./imgui_impl"
import LevelViewModule from "./LevelViewModule";
import ModuleManager from "./ModuleManager";
import CommonModule from "./CommonModule";
import WebData from "./WebData";
import WebSocketManager from "./WebSocketManager";
import ConsoleModule from "./ConsoleModule";


export { ImGui, ImGui_Impl }

export const version = "0.1.46";


export function ImGuiObject(obj: any, id: number = 0): number {
    if (obj == null) {
        ImGui.Text("(null)");
        return id;
    }
    Object.entries(obj).forEach(([key, value]) => {
        ImGui.PushID(id);
        id++;
        if (value == null) {
            ImGui.Text(key + ": (null)");
        }
        else if (typeof (value) === 'object') {
            if (ImGui.TreeNode(key)) {
                id = ImGuiObject(value, id + 1);
                ImGui.TreePop();
            }
        }
        else if (typeof (value) === 'number') {
            let v = (_: number = value as number): number => obj[key] = _;
            ImGui.SetNextItemWidth(100);
            ImGui.InputFloat(key, v);
        }
        else if (typeof (value) === 'boolean') {
            let v = (_: boolean = value as boolean): boolean => obj[key] = _;
            ImGui.SetNextItemWidth(100);
            ImGui.Checkbox(key, v);
        }
        else {
            ImGui.Text(key + ": " + value);
        }
        ImGui.PopID();
    })
    return id;
}

let _main: Main;

function _loop(time: number) {
    _main.loop(time);
    window.requestAnimationFrame(_loop);
}

class Main {
    constructor() {
    }

    // logic
    prev_time: number = 0;
    first: boolean = true;
    // manger
    wsMgr: WebSocketManager
    modMgr: ModuleManager

    Prepar() {
        this.wsMgr = new WebSocketManager("ws://127.0.0.1:3000/wsHtml")
        this.modMgr = new ModuleManager(this.wsMgr)
        this.wsMgr.addMessageHandler((data: any) => {
            var webData = WebData.Unpack(data)
            this.modMgr.handleData(webData)
        })
        this.wsMgr.setOnOpen(() => {
            var hello = new WebData("hello", "im html")
            this.wsMgr.send(hello)
        })
        this.RegisterModules()
    }

    RegisterModules() {
        // 注册模块
        // this.modMgr.registerModule(new ExampleModule())
        // this.modMgr.registerModule(new HelloModule())
        this.modMgr.registerModule(new ConsoleModule())
        this.modMgr.registerModule(new LevelViewModule())
        this.modMgr.registerModule(new CommonModule())
    }

    ImGuiWindow(win: ImGui.Window) {
        ImGui.Text("ID:" + win.ID);
        ImGui.InputFloat2("Pos", win.Pos);
        ImGui.SliderFloat2("Scroll", win.Scroll, 0, win.ScrollMax.y);
        ImGui.InputFloat2("ScrollMax", win.ScrollMax);
        ImGui.Text("ScrollbarX:" + win.ScrollbarX);
        ImGui.Text("ScrollbarY:" + win.ScrollbarY);
    }

    loop(time: number): void {
        if (ImGui_Impl.is_contextlost)
            return;
        if (!ImGui_Impl.any_pointerdown() && time - this.prev_time < 1000.0 / 30) {
            //return;
        }
        this.prev_time = time;

        ImGui_Impl.NewFrame(time);
        ImGui.NewFrame();

        if (this.first) {
            this.Prepar()
            ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0));
            if (ImGui.isMobile.any())
                ImGui.SetNextWindowSize(new ImGui.ImVec2(ImGui_Impl.canvas.scrollWidth, ImGui_Impl.canvas.scrollHeight));
            else
                ImGui.SetNextWindowSize(new ImGui.ImVec2(600, 500));
        }

        ImGui.Begin("Game ImGUI"); // 开始创建名为 "My New Window" 的窗口
        // ImGui.Text("This is a sample text inside the window."); // 在窗口内添加文本
        // 可以继续添加其他 ImGui 组件，例如按钮、输入框等
        // if (ImGui.Button("Click Me")) {
        //     console.log("Button clicked!");
        // }

        if (this.wsMgr.isConnectionOpen()) {
            this.loopOpen()
        }
        else {
            ImGui.Text("WebSocket is connecting.");
        }

        // ImGui.Text("Loop Open Is Over!");

        ImGui.End(); // 结束窗口创建


        ImGui.ShowDemoWindow();
        // ImGui.ShowMetricsWindow();

        ImGui.EndFrame();
        ImGui.Render();

        ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1));
        ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
        this.first = false
    }

    loopOpen() {
        this.modMgr.renderAllUI()
    }

}

window.addEventListener('DOMContentLoaded', async () => {
    await ImGui.default();
    ImGui.CHECKVERSION();
    console.log("ImGui.CreateContext() VERSION=", ImGui.VERSION);
    console.log("imgui-ts version=", version);

    ImGui.CreateContext();
    ImGui.StyleColorsDark();
    if (ImGui.isMobile.any()) {
        ImGui_Impl.setCanvasScale(1);
        ImGui_Impl.setFontScale(1.5)
    }

    const io: ImGui.IO = ImGui.GetIO();
    let font = io.Fonts.AddFontDefault();
    font.FontName = "Microsoft JhengHei";
    // font.FontName = "Arial";
    //font.FontName="sans-serif"
    font.FontStyle = "bold";
    font.FontSize = 16;
    //font.Ascent=2.5;

    let font2 = ImGui.CreateFont("Microsoft JhengHei", 16, "bold");
    font2.AddFontRange(0x4E00, 0x9FFF);
    font.MergeFont(font2);

    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    ImGui_Impl.Init(canvas);

    _main = new Main;
    window.requestAnimationFrame(_loop);
});
