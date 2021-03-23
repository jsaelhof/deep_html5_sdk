///<reference path="Event.ts"/>

module deep.sdk.events {

    export class GameActionEvent extends Event {

        public static ACTION:string = "gameAction";

        constructor ( private id:string, private data:any={} ) {
            super(GameActionEvent.ACTION);
        }

        public get Id () : string {
            return this.id;
        }

        public get Data () : any {
            return this.data;
        }

    }

}