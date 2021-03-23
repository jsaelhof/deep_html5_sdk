///<reference path="events/Event.ts"/>

module deep.sdk {

    export interface IEventDispatcher {
        dispatchEvent (event:events.Event) : void
        addEventListener (type:string, handlerFunc:(event:events.Event) => void) : void
        removeEventListener (type:string, handlerFunc:(event:events.Event) => void) : void
        removeAllEventListeners () : void
        hasEventListener (type:string, handlerFunc:(event:events.Event) => void) : boolean
    }

    export class EventDispatcher implements IEventDispatcher {
        private listeners:any = {};

        public dispatchEvent (event:events.Event) : void {
            // Setting a timeout of 1 ensures that when things are dispatched, the rest of the execution
            // at the time can finish before all the execution in the scope of the handlers can run.
            if (this.listeners[event.type] !== undefined && this.listeners[event.type].length > 0) {
                var list:any = this.listeners[event.type].slice(0); // Prevent the list from changing
                for (var i:number = 0; i < list.length; i++) {
                    list[i].call(this, event);
                }
            }
        }

        public addEventListener (type:string, handlerFunc:(event:events.Event) => void) : void {
            if (!this.listeners[type]) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(handlerFunc);
        }

        public removeEventListener (type:string, handlerFunc:(event:events.Event) => void) : void {
            if (this.listeners[type]) {
                for (var i:number = this.listeners[type].length - 1; i >= 0; i--) {
                    if (this.listeners[type][i] === handlerFunc) {
                        this.listeners[type].splice(i, 1);
                    }
                }
            }
        }

        public removeAllEventListeners () : void {
            this.listeners = {};
        }

        public hasEventListener (type:string, handlerFunc:(event:events.Event) => void) : boolean {
            if (this.listeners[type]) {
                for (var i = 0; i < this.listeners[type].length; i++) {
                    if (this.listeners[type][i] === handlerFunc) {
                        return true;
                    }
                }
            }
            return false;
        }

    }


}