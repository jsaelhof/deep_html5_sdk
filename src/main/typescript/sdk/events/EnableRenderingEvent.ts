///<reference path="Event.ts"/>

module deep.sdk.events {

    export class EnableRenderingEvent extends sdk.events.Event {

        static ENABLE:string = "enableRendering";

        constructor () {
            super( EnableRenderingEvent.ENABLE );
        }

    }

}