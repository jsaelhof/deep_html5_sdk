///<reference path="../EventDispatcher.ts"/>
///<reference path="../messaging/AbstractGameRequest.ts"/>
///<reference path="IDisplayInfo.ts"/>
///<reference path="IGameInfo.ts"/>
///<reference path="../assets/Assets.ts"/>
///<reference path="../sound/ISoundEngine.ts"/>

module deep.sdk.bridge {

    export interface IBridge extends IEventDispatcher {
        sendGameLoaded () : void
        sendGameReady () : void
        sendGameRequest ( request:messaging.AbstractGameRequest ) : void
        exitGame ( data?:any ) : void
        showError ( devMessage:string, userMessage?:string ) : void
        saveGameItem ( key:string, value:string ) : void
        getGameItem ( key:string ) : string
        saveSkinItem ( key:string, value:string ) : void
        getSkinItem ( key:string ) : string

        // Access Property Data of the Core
        DisplayInfo : sdk.bridge.IDisplayInfo
        GameInfo : sdk.bridge.IGameInfo
        GameAssets : sdk.assets.Assets
        GameLayout : any
        Sound: sdk.sound.ISoundEngine
        Lang: any
        PrizeInfo: sdk.bridge.IPrizeInfo
        LeaderboardInfo: sdk.bridge.ILeaderboardInfo
        Demo: boolean
        Preview?: boolean
        PreviewInfo?: sdk.bridge.IPreviewInfo
    }

}