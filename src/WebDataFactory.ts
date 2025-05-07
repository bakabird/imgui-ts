import WebData from "./WebData";

export default class WebDataFactory {
    public static OpenFunc(func: string, toOpen: boolean): WebData {
        return new WebData("openFunc", {
            func,
            open: toOpen,
        }, true)
    }

    public static RunCommand(func: string, args: Record<string, any> = {}): WebData {
        return new WebData("runCommand", {
            func,
            args,
        }, true)
    }


    public static PullLogs(): WebData {
        return new WebData("pullLogs", "", true)
    }

}
