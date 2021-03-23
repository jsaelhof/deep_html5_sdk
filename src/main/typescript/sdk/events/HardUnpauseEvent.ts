///<reference path="Event.ts"/>

module deep.sdk.events {

    export class HardUnpauseEvent extends sdk.events.Event {

        static UNPAUSE:string = "unpause";

        constructor () {
            super( HardUnpauseEvent.UNPAUSE );
        }

    }

}