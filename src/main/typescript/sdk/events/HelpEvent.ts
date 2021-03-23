///<reference path="Event.ts"/>

module deep.sdk.events {

    export class HelpEvent extends sdk.events.Event {

        static HELP:string = "help";

        constructor () {
            super( HelpEvent.HELP );
        }

    }

}