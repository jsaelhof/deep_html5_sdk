///<reference path="Event.ts"/>
///<reference path="../messaging/AbstractGameRequest.ts"/>

module deep.sdk.events {

    export class GameResponseEvent extends Event {

        public static GAME_RESPONSE:string = "gameResponse";

        constructor ( public request:sdk.messaging.AbstractGameRequest, public response:any ) {
            super(GameResponseEvent.GAME_RESPONSE);
        }

    }

}