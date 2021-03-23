///<reference path="Event.ts"/>

module deep.sdk.events {

    export class OrientationChangeEvent extends sdk.events.Event {

        static ORIENTATION_CHANGE:string = "orientationChange";

        constructor (
            public orientation:sdk.device.Orientation
        ) {
            super( OrientationChangeEvent.ORIENTATION_CHANGE );
        }

    }

}