module deep.sdk.utils {

    export class TickerTimer extends sdk.EventDispatcher {

        private startTime:number;
        private complete:boolean;
        private running:boolean;
        private lastTime:number;

        constructor ( private milliseconds:number=0, private millisecondResolution:boolean=false ) {
            super();
        }

        public start () : boolean {
            if (this.startTime === undefined) {
                this.startTime = createjs.Ticker.getTime(true);
                createjs.Ticker.addEventListener("tick",this.onTick);
                this.complete = false;
                this.running = true;
                return true;
            } else {
                return false;
            }
        }

        public stop () : void {
            this.running = false;
            createjs.Ticker.removeEventListener("tick",this.onTick);
        }

        public get Complete () : boolean {
            return this.complete;
        }

        public get Running () : boolean {
            return this.running;
        }

        private onTick = ( event:createjs.Ticker ) : void => {
            var elapsed:number = createjs.Ticker.getTime(true) - this.startTime;
            var timeLeft:number = Math.max(this.milliseconds - elapsed,0);

            if (timeLeft == 0) {
                this.complete = true;
                this.stop();
            }

            // Determine if we should send an update event.
            // If the timer is on a millisecond resolution, always send one.
            // If the time is not on millisecond resolution, then see if a full second has elapsed.
            // If so, send an update. If not, cancel the update event.
            var dispatchTimerEvent:boolean = true;
            if (!this.millisecondResolution) {
                var seconds = Math.floor(elapsed/1000);
                if (seconds === this.lastTime) {
                    dispatchTimerEvent = false;
                }
                this.lastTime = seconds;
            }

            // If an event should be dispatched, send it.
            // If the timer is complete, always send the last update.
            if (dispatchTimerEvent || this.complete) {
                this.dispatchEvent(new events.TickerTimerEvent(elapsed, timeLeft, this.milliseconds));
            }

            // If the timer is complete, send a complete event.
            if (this.complete) {
                this.dispatchEvent(new events.TickerTimerCompleteEvent( this.milliseconds ));
            }
        };

    }

}