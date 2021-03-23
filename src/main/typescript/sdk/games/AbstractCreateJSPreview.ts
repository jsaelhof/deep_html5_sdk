///<reference path="AbstractPreview.ts"/>

module deep.sdk.games {

    export class AbstractCreateJSPreview extends AbstractPreview {

        protected jqGameCanvas:JQuery;
        protected gameCanvas:HTMLCanvasElement;
        protected stage:createjs.Stage;

        private tickerEnabled:boolean;

        constructor ( enableTicker:boolean = false ) {
            super();
            deep.Bridge.addEventListener(sdk.events.GameInfoEvent.GAME_INFO,this.acjsp_onGameInfo);
            if (enableTicker) this.enableTicker();
        }

        private acjsp_onGameInfo = (event:sdk.events.GameInfoEvent) => {
            console.log("On Game Info");
            $("body")
                .append('<canvas id="previewCanvas"/>');

            this.jqGameCanvas = $("#previewCanvas");
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

            this.stage = new createjs.Stage("previewCanvas");

            createjs.Ticker.framerate = 60;
            createjs.Ticker.timingMode = createjs.Ticker.RAF;

            // Do not start handling resize events until onGameInfo occurs.
            // Before onGameInfo, the bridge's DisplayInfo object is not set and the
            // information needed to do the resizing is not available.
            deep.Bridge.addEventListener(sdk.events.ResizeEvent.RESIZE,this.acjsp_onResize);
        };

        protected enableTicker () : void {
            if (!this.tickerEnabled) {
                this.tickerEnabled = true;
                createjs.Ticker.addEventListener("tick", this.acjsp_onTick);
            }
        }

        protected disableTicker () : void {
            if (this.tickerEnabled) {
                this.tickerEnabled = false;
                createjs.Ticker.removeEventListener("tick", this.acjsp_onTick);
            }
        }

        private acjsp_onTick = ( event:createjs.Event ) : void => {
            if (this.stage) {
                this.stage.update(event);
            }
        };

        private acjsp_onResize = ( event:sdk.events.ResizeEvent ) : void => {
            this.gameCanvas.width = event.renderWidth * deep.Bridge.DisplayInfo.DevicePixelRatio;
            this.gameCanvas.height = event.renderHeight * deep.Bridge.DisplayInfo.DevicePixelRatio;
            this.jqGameCanvas.css({
                "width": event.renderWidth,
                "height": event.renderHeight
            });

            this.stage.scaleX = event.renderScale * deep.Bridge.DisplayInfo.DevicePixelRatio;
            this.stage.scaleY = event.renderScale * deep.Bridge.DisplayInfo.DevicePixelRatio;

            this.stage.update();
        };

    }

}