module deep.sdk.text {
    
    export class BitmapTextFactory {

        private static fonts:any = {};
        private static defaultProps:any = {};

        public static setup ( id:string, imageId:string, dataId:string ) : void {
            if (!deep.Bridge.GameAssets.hasAsset(imageId)) {
                throw "No font image found for id '"+id+"' (expected '"+imageId+"')";
            }

            if (!deep.Bridge.GameAssets.hasAsset(dataId)) {
                throw "No font data found for id '"+id+"' (expected '"+dataId+"')";
            }

            var fontSSD:any = sdk.utils.CreateJSUtils.fntXmlToSpriteSheetData(
                [
                    deep.Bridge.GameAssets.getAsset(imageId)
                ],
                deep.Bridge.GameAssets.getAsset(dataId)
            );

            var font:createjs.BitmapText = new createjs.BitmapText();
            font.spriteSheet = new createjs.SpriteSheet(fontSSD);
            BitmapTextFactory.fonts[id] = font;
        }

        public static setDefaultProps ( font:string, props:any ) : void {
            BitmapTextFactory.defaultProps[font] = props;
        }

        private static getFont ( id:string ) : createjs.BitmapText {
            if (!BitmapTextFactory.fonts[id]) {
                // No font found, attempt to setup one automatically using default pattern
                BitmapTextFactory.setup(id,id,id+"-data");
            }

            return BitmapTextFactory.fonts[id];
        }

        public static make ( idOrObj:string|{ font:string, text?:string, props?:any, reg?:layout.Registration }, text:string="", props:any={}, reg:layout.Registration=layout.Registration.None ) : createjs.BitmapText {
            if (typeof idOrObj === "string") {
                return BitmapTextFactory.createBitmapText(idOrObj,text,props,reg);
            } else {
                return BitmapTextFactory.createBitmapText(idOrObj.font,idOrObj.text,idOrObj.props,idOrObj.reg);
            }
        }

        private static createBitmapText ( id:string, text:string, props:any, reg:layout.Registration ) : createjs.BitmapText {
            var bt:createjs.BitmapText = <createjs.BitmapText>BitmapTextFactory.getFont(id).clone();
            bt.text = text;

            if (BitmapTextFactory.defaultProps[id]) {
                sdk.utils.LayoutUtils.applyProps(bt,BitmapTextFactory.defaultProps[id]);
            }

            sdk.utils.LayoutUtils.applyProps(bt,props);

            switch (reg) {
                case layout.Registration.TopLeft:
                    bt.regX = 0;
                    bt.regY = 0;
                    break;
                case layout.Registration.TopCenter:
                    bt.regX = bt.getBounds().width/2;
                    bt.regY = 0;
                    break;
                case layout.Registration.TopRight:
                    bt.regX = bt.getBounds().width;
                    bt.regY = 0;
                    break;
                case layout.Registration.CenterRight:
                    bt.regX = bt.getBounds().width;
                    bt.regY = bt.getBounds().height/2;
                    break;
                case layout.Registration.BottomRight:
                    bt.regX = bt.getBounds().width;
                    bt.regY = bt.getBounds().height;
                    break;
                case layout.Registration.BottomCenter:
                    bt.regX = bt.getBounds().width/2;
                    bt.regY = bt.getBounds().height;
                    break;
                case layout.Registration.BottomLeft:
                    bt.regX = 0;
                    bt.regY = bt.getBounds().height;
                    break;
                case layout.Registration.CenterLeft:
                    bt.regX = 0;
                    bt.regY = bt.getBounds().height/2;
                    break;
                case layout.Registration.Center:
                    bt.regX = bt.getBounds().width/2;
                    bt.regY = bt.getBounds().height/2;
                    break;
                case layout.Registration.Left:
                    bt.regX = 0;
                    break;
                case layout.Registration.Right:
                    bt.regX = bt.getBounds().width;
                    break;
                case layout.Registration.Top:
                    bt.regY = 0;
                    break;
                case layout.Registration.Bottom:
                    bt.regY = bt.getBounds().height;
                    break;
                case layout.Registration.CenterX:
                    bt.regX = bt.getBounds().width/2;
                    break;
                case layout.Registration.CenterY:
                    bt.regY = bt.getBounds().height/2;
                    break;
            }

            return bt;
        }
    }

}