module deep.sdk.games {

    export class AbstractPreview {

        constructor () {
            deep.Bridge.addEventListener(sdk.events.GameInfoEvent.GAME_INFO,this.ap_onGameInfo);

            // Timeout exists to make sure that sub-class constructors run before this gets sent.
            // If it's sent immediately, subclasses don't get their listeners for GameInfoEvent
            // added before the core dispatches the event.
            setTimeout(() => { deep.Bridge.sendGameLoaded() }, 10);
        }

        private ap_onGameInfo = (event:sdk.events.GameInfoEvent) : void => {
            setTimeout(() => { this.start() },1);
        };

        // ABSTRACT METHODS
        //
        protected start () : void {
            throw new Error ("Implementing class must override start");
        }

    }

}