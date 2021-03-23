///<reference path="Event.ts"/>

module deep.sdk.events {

    export class ScrollWarningStartEvent extends sdk.events.Event {

        static START:string = "scrollWarningStart";

        constructor () {
            super( ScrollWarningStartEvent.START );
        }

    }

}