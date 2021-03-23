///<reference path="Event.ts"/>

module deep.sdk.events {

    export class ScrollWarningEndEvent extends sdk.events.Event {

        static END:string = "scrollWarningEnd";

        constructor () {
            super( ScrollWarningEndEvent.END );
        }

    }

}