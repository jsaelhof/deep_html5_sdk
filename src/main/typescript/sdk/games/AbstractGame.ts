module deep.sdk.games {

    export class AbstractGame {

        constructor () {
            $("body")
                .empty()
                .append('<div id="game"></div>');

            // Get a reference to the bridge shared by both Core and Game
            deep.Bridge = (<any>parent).deep.Bridge;
            deep.Bridge.addEventListener(sdk.events.GameInfoEvent.GAME_INFO,this.ag_onGameInfo);
            deep.Bridge.addEventListener(sdk.events.GameResponseEvent.GAME_RESPONSE,this.ag_onGameResponse);

            // Timeout exists to make sure that sub-class constructors run before this gets sent.
            // If it's sent immediately, subclasses don't get their listeners for GameInfoEvent
            // added before the core dispatches the event.
            setTimeout(() => { deep.Bridge.sendGameLoaded() }, 10);
        }

        private ag_onGameInfo = (event:sdk.events.GameInfoEvent) : void => {
            setTimeout(() => { this.start() },1);
        };

        private ag_onGameResponse = (event:sdk.events.GameResponseEvent) : void => {
            if (event.request.Name === sdk.messaging.PlayResultRequest.NAME) {
                deep.Bridge.removeEventListener(sdk.events.GameResponseEvent.GAME_RESPONSE,this.ag_onGameResponse);
                this.onPlayResult( new sdk.messaging.PlayResultResponse(event.response) );
            }
        };

        // ABSTRACT METHODS
        //
        protected start () : void {
            throw new Error ("Implementing class must override start");
        }

        protected onPlayResult ( response:sdk.messaging.PlayResultResponse ) : void {}

    }

}