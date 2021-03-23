///<reference path="Event.ts"/>

module deep.sdk.events {

    export class TickerTimerEvent extends sdk.events.Event {

        static TIMER:string = "tickerTimer";

        constructor (
            private elapsed:number,
            private remaining:number,
            private total:number
        ) {
            super( TickerTimerEvent.TIMER );
        }

        public get Elapsed () : number {
            return this.elapsed;
        }

        public get Remaining () : number {
            return this.remaining;
        }

        public get Total () : number {
            return this.total;
        }

        public get Complete () : boolean {
            return this.remaining == 0;
        }

    }

}