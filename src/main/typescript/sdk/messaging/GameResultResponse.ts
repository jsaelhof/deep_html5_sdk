module deep.sdk.messaging {

    export class GameResultResponse {

        private result:string;

        constructor ( response:any ) {
            this.result = response.result;
        }

    }

}