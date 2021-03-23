///<reference path="AbstractGameRequest.ts"/>

module deep.sdk.messaging {

    export class GameResultRequest extends AbstractGameRequest {

        public static NAME:string = "gameResultRequest";

        constructor ( public score:number ) {
            super(GameResultRequest.NAME);
            this.appendParam("score",score);
        }

    }

}