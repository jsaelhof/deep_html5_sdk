///<reference path="Event.ts"/>

module deep.sdk.events {

    export class RotationWarningHiddenEvent extends sdk.events.Event {

        static HIDDEN:string = "rotationWarningHiddenEvent";

        constructor () {
            super( RotationWarningHiddenEvent.HIDDEN );
        }

    }

}