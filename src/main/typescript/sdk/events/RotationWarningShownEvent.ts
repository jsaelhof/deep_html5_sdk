///<reference path="Event.ts"/>

module deep.sdk.events {

    export class RotationWarningShownEvent extends sdk.events.Event {

        static SHOWN:string = "rotationWarningShownEvent";

        constructor () {
            super( RotationWarningShownEvent.SHOWN );
        }

    }

}