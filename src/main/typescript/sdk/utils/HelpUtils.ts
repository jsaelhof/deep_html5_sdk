module deep.sdk.utils {

    export class HelpUtils {

        public static getHelpBackground ( orientation:sdk.device.Orientation ) : createjs.DisplayObject {
            var background:createjs.Shape = new createjs.Shape();

            switch (orientation) {
                case sdk.device.Orientation.Portrait:
                    background.graphics
                        .f("#FFF")
                        .r(10,60,780,1160)
                        .ef();
                    background.setBounds(10,60,780,1160);
                    break;

                case sdk.device.Orientation.Landscape:
                    background.graphics
                        .f("#FFF")
                        .r(60,70,1160,660)
                        .ef();
                    background.setBounds(60,70,1160,660);
                    break;
            }

            // Assign an empty click handler.
            // This just makes sure the user can't click things under the help background.
            background.addEventListener("click",() => {});

            // If this game is using a canvas size different than the core canvas, then we need to scale the
            // background to fit that canvas size. We'll do this using the game canvas scale which is a ratio
            // of the core canvas to the game canvas.
            background.scaleX = background.scaleY = deep.Bridge.DisplayInfo.GameCanvasScale;

            return background;
        }

        public static getNextButton ( orientation:sdk.device.Orientation, lang:string ) : createjs.DisplayObject {
            return HelpUtils.getButton("next",orientation);
        }

        public static getPlayButton ( orientation:sdk.device.Orientation, lang:string ) : createjs.DisplayObject {
            return HelpUtils.getButton("play",orientation);
        }

        public static getButton ( id:string, orientation:sdk.device.Orientation ) : createjs.DisplayObject {
            var container:createjs.Container = new createjs.Container();

            var button:createjs.Bitmap = new createjs.Bitmap(deep.Bridge.GameAssets.getAsset("__sdk/help/lang/"+id));
            container.addChild(button);

            switch (orientation) {
                case sdk.device.Orientation.Portrait:
                    container.regX = 190;
                    container.regY = 120;
                    container.x = 400 * deep.Bridge.DisplayInfo.GameCanvasScale;
                    container.y = 1210 * deep.Bridge.DisplayInfo.GameCanvasScale;
                    break;

                case sdk.device.Orientation.Landscape:
                    container.regX = 380;
                    container.regY = 120;
                    container.x = 1210 * deep.Bridge.DisplayInfo.GameCanvasScale;
                    container.y = 720 * deep.Bridge.DisplayInfo.GameCanvasScale;
                    break;
            }

            // If this game is using a canvas size different than the core canvas, then we need to scale the
            // button to fit that canvas size. We'll do this using the game canvas scale which is a ratio
            // of the core canvas to the game canvas.
            container.scaleX = container.scaleY = deep.Bridge.DisplayInfo.GameCanvasScale;

            return container;
        }

    }

}