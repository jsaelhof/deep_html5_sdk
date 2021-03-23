module deep.sdk.sound {
    export interface ISoundEngine extends IEventDispatcher {
        play (id:string, options?:any) : string;
        stop ( instanceId:string ) : void;
    }
}