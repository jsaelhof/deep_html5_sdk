
module deep.sdk.bridge {

    export interface IGameInfo {
        GameId: string
        GameContext: string
        SkinId: string
        SkinContext: string
        GameDescriptor: data.GameDescriptor
        GameOrientation: sdk.device.Orientation
        Lang: string
    }

}