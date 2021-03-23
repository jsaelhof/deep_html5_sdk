///<reference path="Event.ts"/>

module deep.sdk.events {

    export class GameCleanupEvent extends Event {

        public static CLEANUP:string = "gameCleanup";

        constructor () {
            super(GameCleanupEvent.CLEANUP);
        }

    }

}