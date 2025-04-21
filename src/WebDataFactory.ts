import WebData from "./WebData";

export default class WebDataFactory {
    public static OpenFunc(func: string, toOpen: boolean): WebData {
        return new WebData("openFunc", {
            func,
            open: toOpen,
        }, true)
    }

}
