///<reference path="Event.ts"/>

module deep.sdk.events {

    export class ResizeEvent extends sdk.events.Event {

        static RESIZE:string = "resize";

        constructor (
            public renderScale:number,
            public renderWidth:number,
            public renderHeight:number,
            public viewportWidth:number,
            public viewportHeight:number
        ) {
            super( ResizeEvent.RESIZE );
        }

    }

}