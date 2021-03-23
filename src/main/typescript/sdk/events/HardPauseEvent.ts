///<reference path="Event.ts"/>

module deep.sdk.events {

    export class HardPauseEvent extends sdk.events.Event {

        static PAUSE:string = "pause";

        constructor () {
            super( HardPauseEvent.PAUSE );
        }

    }

}