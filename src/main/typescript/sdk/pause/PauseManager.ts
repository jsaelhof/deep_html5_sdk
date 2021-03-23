module deep.sdk.pause {

    enum PauseTrigger {
        Unpaused, Help, Menu, ScrollWarning, RotationWarning, HardPause
    }

    /**
     * This class is designed to pause and unpause the game based on matching events.
     * In other words, if the "Open Menu" event initiates a pause, only a matching "close menu" event
     * will unpause. Any other "pause-start" or "pause-end" events are ignored.
     * This prevents secondary unpause events from unapusing the game. For example, if the pause is
     * started by the "Open Menu" event, then the user rotates their phone and triggers a "Rotation Warning Shown"
     * event (another pause start event), then rotates their phone back and triggers a "Rotation Warning Hidden"
     * event (pause end event), the game SHOULD NOT unpause because the menu is still open.
     * This logic works for the current set of events, the order they can fire, and the expected behaviour.
     * In the future, new events or changes to the order or expected behaviour may require rethinking this logic
     * or adding additional case-by-case handling.
     *
     * The hard pause and unpause events are special events used to force a typical pause in the game but
     * without a corresponding scenario such as opening a menu or the rotation warnings which only pause
     * as a secondary action (therefore, a soft pause). This trigger would be used if a dedicated pause button
     * were implemented. It will be used first as part of the core's debug console to allow testing pauses directly.
     */
    export class PauseManager {

        private pauseTrigger:PauseTrigger = PauseTrigger.Unpaused;

        constructor ( private pauseHandler:Function=undefined, private unpauseHandler:Function=undefined, private autoPauseTicker:boolean=true ) {
            // Events that PAUSE
            deep.Bridge.addEventListener(sdk.events.HardPauseEvent.PAUSE, this.onHardPause);
            deep.Bridge.addEventListener(sdk.events.HelpEvent.HELP, this.onHelp);
            deep.Bridge.addEventListener(sdk.events.OpenMenuEvent.OPEN, this.onOpenMenu);
            deep.Bridge.addEventListener(sdk.events.ScrollWarningStartEvent.START, this.onScrollWarningStart);
            deep.Bridge.addEventListener(sdk.events.RotationWarningShownEvent.SHOWN, this.onRotationWarningShown);

            // Events that UNPAUSE
            // NOTE: Closing help is handled within the game and does not generate a bridge event from the Core. See closeHelp method.
            deep.Bridge.addEventListener(sdk.events.HardUnpauseEvent.UNPAUSE, this.onHardUnpause);
            deep.Bridge.addEventListener(sdk.events.CloseMenuEvent.CLOSE, this.onCloseMenu);
            deep.Bridge.addEventListener(sdk.events.ScrollWarningEndEvent.END, this.onScrollWarningEnd);
            deep.Bridge.addEventListener(sdk.events.RotationWarningHiddenEvent.HIDDEN, this.onRotationWarningHidden);
        }


        public get Paused () : boolean {
            return this.pauseTrigger !== PauseTrigger.Unpaused;
        }


        private onHardPause = () : void => {
            this.pause(PauseTrigger.HardPause);
        };

        private onHelp = () : void => {
            this.pause(PauseTrigger.Help);
        };

        private onOpenMenu = () : void => {
            this.pause(PauseTrigger.Menu);
        };

        private onScrollWarningStart = () : void => {
            this.pause(PauseTrigger.ScrollWarning);
        };

        private onRotationWarningShown = () : void => {
            this.pause(PauseTrigger.RotationWarning);
        };


        public closeHelp () : void {
            this.unpause(PauseTrigger.Help);
        }

        private onHardUnpause = () : void => {
            this.unpause(PauseTrigger.HardPause);
        };

        private onCloseMenu = () : void => {
            this.unpause(PauseTrigger.Menu);
        };

        private onScrollWarningEnd = () : void => {
            this.unpause(PauseTrigger.ScrollWarning);
        };

        private onRotationWarningHidden = () : void => {
            this.unpause(PauseTrigger.RotationWarning);
        };


        private pause ( trigger:PauseTrigger ) : void {
            if (this.pauseTrigger === PauseTrigger.Unpaused) {
                this.pauseTrigger = trigger;
                if (this.autoPauseTicker) createjs.Ticker.paused = true;
                if (this.pauseHandler) this.pauseHandler.apply(null);
            }
        }

        private unpause ( trigger:PauseTrigger ) : void {
            if (this.pauseTrigger === trigger) {
                this.pauseTrigger = PauseTrigger.Unpaused;
                if (this.autoPauseTicker) createjs.Ticker.paused = false;
                if (this.unpauseHandler) this.unpauseHandler.apply(null);
            }
        }

    }

}