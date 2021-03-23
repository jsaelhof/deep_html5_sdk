///<reference path="Event.ts"/>

module deep.sdk.events {

    export class GameInfoEvent extends Event {

        public static GAME_INFO:string = "gameInfo";

        constructor (
            public gameId:string,
            public gameContext:string,
            public skinId:string,
            public skinContext:string,
            public width:number,
            public height:number,
            public orientation:sdk.device.Orientation,
            public breakpoint:number,
            public ratio:number,
            public lang:string
        ) {
            super(GameInfoEvent.GAME_INFO);
        }

    }

}