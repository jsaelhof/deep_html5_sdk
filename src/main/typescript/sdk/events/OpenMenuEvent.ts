///<reference path="Event.ts"/>

module deep.sdk.events {

    export class OpenMenuEvent extends sdk.events.Event {

        static OPEN:string = "openMenu";

        constructor () {
            super( OpenMenuEvent.OPEN );
        }

    }

}