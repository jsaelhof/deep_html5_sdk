///<reference path="Event.ts"/>

module deep.sdk.events {

    export class TickerTimerCompleteEvent extends sdk.events.Event {

        static COMPLETE:string = "tickerTimerComplete";

        constructor (
            private total:number
        ) {
            super( TickerTimerCompleteEvent.COMPLETE );
        }

        public get Total () : number {
            return this.total;
        }

    }

}