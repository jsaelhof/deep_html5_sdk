///<reference path="AbstractGameRequest.ts"/>

module deep.sdk.messaging {

    export class SurveyResultRequest extends AbstractGameRequest {

        private gameResults:
            {
                "gameDataHash": string,
                "details": {
                    "selection": string,
                    "correct": number
                }
            }[];


        public static NAME:string = "surveyResultRequest";

        constructor ( public score:number ) {
            super(SurveyResultRequest.NAME);
            this.gameResults = [];
        }

        public addResponse(hash:string, selection:string, correct:number)
        {
            let singleResult =
                {
                    "gameDataHash": hash,
                    "details":
                        {
                            "selection":selection,
                            "correct":correct
                        }
                };

                this.gameResults.push(singleResult)
        }

        public finalizeReponses()
        {
            this.appendParam("gameResults",this.gameResults);
        }
    }
}