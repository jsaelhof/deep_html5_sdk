
module deep.sdk.bridge {

    export interface IDisplayInfo {
        ViewportWidth: number
        ViewportHeight: number
        RenderWidth: number
        RenderHeight: number
        StageWidth: number
        StageHeight: number
        Orientation: sdk.device.Orientation
        RenderScale: number
        Breakpoint: number
        Ratio: number
        DevicePixelRatio: number
        GameCanvasScale: number
    }

}