module deep.sdk.utils {

    interface TimeoutInstance {
        id:number
        timestamp:number
        callback:Function
        delay:number
        args:any[]
        scope:any
        loop:boolean
    }

    export class TickerTimeout {

        private static timeouts:TimeoutInstance[] = [];
        private static timeoutId:number = 0;
        private static running:boolean = false;

        public static setTimeout ( callback:Function, delay:number, args:any[]=[], scope:any=undefined ) {
            return TickerTimeout.createInstance( false, callback, delay, args, scope );
        }

        public static setInterval ( callback:Function, delay:number, args:any[]=[], scope:any=undefined ) {
            return TickerTimeout.createInstance( true, callback, delay, args, scope );
        }

        public static clearTimeout ( id:number ) : void {
            for (var i:number=TickerTimeout.timeouts.length-1; i>=0; i--) {
                var timeoutInstance:TimeoutInstance = TickerTimeout.timeouts[i];
                if (id == timeoutInstance.id) {
                    TickerTimeout.timeouts.splice(i, 1);
                }
            }
        }

        public static clearInterval ( id:number ) : void {
            TickerTimeout.clearTimeout(id);
        }

        private static createInstance ( loop:boolean, callback:Function, delay:number, args:any[]=[], scope:any=undefined ) {
            var timeoutId:number = TickerTimeout.timeoutId++;
            TickerTimeout.timeouts.push({
                id: timeoutId,
                timestamp:createjs.Ticker.getTime(true),
                callback:callback,
                delay:delay,
                args:args,
                scope:scope,
                loop:loop
            });

            if (!TickerTimeout.running) {
                TickerTimeout.running = true;
                createjs.Ticker.addEventListener("tick",TickerTimeout.checkTimeouts);
            }

            return timeoutId;
        }

        private static checkTimeouts () : void {
            for (var i:number=TickerTimeout.timeouts.length-1; i>=0; i--) {
                var timeoutInstance:TimeoutInstance = TickerTimeout.timeouts[i];
                if (createjs.Ticker.getTime(true) - timeoutInstance.timestamp >= timeoutInstance.delay) {
                    timeoutInstance.callback.apply(timeoutInstance.scope,timeoutInstance.args);
                    // If this is an interval (loop==true), then update it's timestamp by
                    // the amount of its delay so that it will trigger again.
                    // If this is a timeout (loop==false), then remove the TickerTimeout.
                    if (timeoutInstance.loop) {
                        timeoutInstance.timestamp += timeoutInstance.delay;
                    } else {
                        TickerTimeout.timeouts.splice(i, 1);
                    }
                }
            }

            if (TickerTimeout.timeouts.length == 0) {
                TickerTimeout.running = false;
                createjs.Ticker.removeEventListener("tick",TickerTimeout.checkTimeouts);
            }
        }

    }

}