///<reference path="AbstractGame.ts"/>

module deep.sdk.games {

    export class AbstractCreateJSGame extends AbstractGame {

        protected jqGameCanvas:JQuery;
        protected gameCanvas:HTMLCanvasElement;
        protected stage:createjs.Stage;

        private tickerEnabled:boolean;

        constructor ( enableTicker:boolean = true ) {
            super();
            deep.Bridge.addEventListener(sdk.events.GameInfoEvent.GAME_INFO,this.acjsg_onGameInfo);
            deep.Bridge.addEventListener(sdk.events.EnableRenderingEvent.ENABLE,this.acjsg_onEnableRendering);
            deep.Bridge.addEventListener(sdk.events.DisableRenderingEvent.DISABLE,this.acjsg_onDisableRendering);
            if (enableTicker) this.enableTicker();
        }

        private acjsg_onGameInfo = (event:sdk.events.GameInfoEvent) => {
            $("#game")
                .append('<canvas id="gameCanvas"/>');

            this.jqGameCanvas = $("#gameCanvas");
            this.gameCanvas = <HTMLCanvasElement>this.jqGameCanvas.get(0);

            this.jqGameCanvas
                .prop({
                    "width": deep.Bridge.DisplayInfo.StageWidth,
                    "height": deep.Bridge.DisplayInfo.StageHeight
                })
                .css({
                    "width": deep.Bridge.DisplayInfo.StageWidth,
                    "height": deep.Bridge.DisplayInfo.StageHeight,
                    "position": "absolute",
                    "left": "50%",
                    "top": "50%",
                    "-webkit-transform": "translate(-50%,-50%)",
                    "-moz-transform": "translate(-50%,-50%)",
                    "-o-transform": "translate(-50%,-50%)",
                    "-ms-transform": "translate(-50%,-50%)",
                    "transform": "translate(-50%,-50%)"
                });

            this.stage = new createjs.Stage("gameCanvas");

            createjs.Ticker.framerate = 60;
            createjs.Ticker.timingMode = createjs.Ticker.RAF;

            // Do not start handling resize events until onGameInfo occurs.
            // Before onGameInfo, the bridge's DisplayInfo object is not set and the
            // information needed to do the resizing is not available.
            deep.Bridge.addEventListener(sdk.events.ResizeEvent.RESIZE,this.acjsg_onResize);

            deep.Bridge.addEventListener(sdk.events.GameCleanupEvent.CLEANUP,this.acjsg_onGameCleanup);
        };

        private acjsg_onGameCleanup = () => {
            this.disableTicker();

            // Tick the stage one more time.
            // This is important so that any changes made during the same "frame"
            // that calls to show the exit screen (which in turn calls this cleanup
            // event) will be rendered to the screen before disabling the auto-draw.
            this.stage.update();

            // Now that the ticker is disabled, start listening just for resize events
            // This fixes an issue where the user resizes the window in some way after the
            // cleanup event which causes the game to disappear entirely.
            deep.Bridge.addEventListener(sdk.events.ResizeEvent.RESIZE,this.acjsg_onResizeAfterCleanup);
        };

        protected enableTicker () : void {
            if (!this.tickerEnabled) {
                this.tickerEnabled = true;
                createjs.Ticker.addEventListener("tick", this.acjsg_onTick);
            }
        }

        protected disableTicker () : void {
            if (this.tickerEnabled) {
                this.tickerEnabled = false;
                createjs.Ticker.removeEventListener("tick", this.acjsg_onTick);
            }
        }

        private acjsg_onTick = ( event:createjs.Event ) : void => {
            if (this.stage) {
                this.stage.update(event);
            }
        };

        private acjsg_onEnableRendering = ( event:events.EnableRenderingEvent ) : void => {
            this.enableTicker();
        };

        private acjsg_onDisableRendering = ( event:events.DisableRenderingEvent ) : void => {
            this.disableTicker();
        };

        private acjsg_onResize = ( event:sdk.events.ResizeEvent ) : void => {
            this.gameCanvas.width = event.renderWidth * deep.Bridge.DisplayInfo.DevicePixelRatio;
            this.gameCanvas.height = event.renderHeight * deep.Bridge.DisplayInfo.DevicePixelRatio;
            this.jqGameCanvas.css({
                "width": event.renderWidth,
                "height": event.renderHeight
            });

            this.stage.scaleX = event.renderScale * deep.Bridge.DisplayInfo.DevicePixelRatio;
            this.stage.scaleY = event.renderScale * deep.Bridge.DisplayInfo.DevicePixelRatio;
        };

        private acjsg_onResizeAfterCleanup = ( event:sdk.events.ResizeEvent ) : void => {
            if (this.stage) {
                this.stage.update();
            }
        };

    }

}