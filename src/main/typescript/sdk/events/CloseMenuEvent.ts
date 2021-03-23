///<reference path="Event.ts"/>

module deep.sdk.events {

    export class CloseMenuEvent extends sdk.events.Event {

        static CLOSE:string = "closeMenu";

        constructor () {
            super( CloseMenuEvent.CLOSE );
        }

    }

}