///<reference path="Event.ts"/>

module deep.sdk.events {

    export class DisableRenderingEvent extends sdk.events.Event {

        static DISABLE:string = "disableRendering";

        constructor () {
            super( DisableRenderingEvent.DISABLE );
        }

    }

}