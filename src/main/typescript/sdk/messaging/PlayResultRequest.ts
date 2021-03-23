///<reference path="AbstractGameRequest.ts"/>

module deep.sdk.messaging {

    export class PlayResultRequest extends AbstractGameRequest {

        public static NAME:string = "playResultRequest";

        constructor () {
            super(PlayResultRequest.NAME);
        }

    }

}