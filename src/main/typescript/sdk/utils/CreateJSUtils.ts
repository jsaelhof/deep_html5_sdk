module deep.sdk.utils {

    export class CreateJSUtils {

        public static resizeToFit ( target:createjs.DisplayObject, constrainWidth:number, constraintHeight:number, preserveAspectRatio:boolean=true, shrinkOnly:boolean=false ) : void {
            var targetBounds:createjs.Rectangle = target.getTransformedBounds();
            var scaleX:number = constrainWidth / targetBounds.width;
            var scaleY:number = constraintHeight / targetBounds.height;
            if (shrinkOnly && scaleX > 1 && scaleY > 1) return;
            if (preserveAspectRatio) {
                var scale:number = Math.min(scaleX, scaleY);
                target.scaleX *= scale;
                target.scaleY *= scale;
            } else {
                target.scaleX *= scaleX;
                target.scaleY *= scaleY;
            }
        }

        public static resizeWidthToFit ( target:createjs.DisplayObject, constrainWidth:number, preserveAspectRatio:boolean=true, shrinkOnly:boolean=false ) : void {
            var targetBounds:createjs.Rectangle = target.getTransformedBounds();
            var scale:number = constrainWidth / targetBounds.width;
            if (shrinkOnly && scale > 1) return;
            if (preserveAspectRatio) {
                target.scaleX *= scale;
                target.scaleY *= scale;
            } else {
                target.scaleX *= scale;
            }
        }

        public static resizeHeightToFit ( target:createjs.DisplayObject, constrainHeight:number, preserveAspectRatio:boolean=true, shrinkOnly:boolean=false ) : void {
            var targetBounds:createjs.Rectangle = target.getTransformedBounds();
            var scale:number = constrainHeight / targetBounds.height;
            if (shrinkOnly && scale > 1) return;
            if (preserveAspectRatio) {
                target.scaleX *= scale;
                target.scaleY *= scale;
            } else {
                target.scaleY *= scale;
            }
        }

        public static makeResizedWrapper ( image:createjs.Bitmap, constrainWidth:number, constrainHeight:number, preserveAspectRatio:boolean=true, shrinkOnly:boolean=false ) : createjs.Container {
            // Make the image as large as we're going to allow.
            CreateJSUtils.resizeToFit(image, constrainWidth, constrainHeight, preserveAspectRatio, shrinkOnly);

            // Get the transformed bounds for future measurements.
            // This is the size we want our objects in memory.
            var bounds:createjs.Rectangle = image.getTransformedBounds();

            // Wrap the image in a container and cache it.
            // This puts the RESIZED pixels on the cache canvas instead
            // the unscaled pixels of the original.
            var imageContainer:createjs.Container = new createjs.Container();
            imageContainer.addChild(image);
            imageContainer.cache(0, 0, bounds.width, bounds.height);

            return imageContainer;
        }

        public static centerReg ( target:createjs.DisplayObject ) : void {
            var bounds:createjs.Rectangle = target.getBounds();
            target.regX = bounds.width/2;
            target.regY = bounds.height/2;
        }

        public static centerRegX ( target:createjs.DisplayObject ) : void {
            var bounds:createjs.Rectangle = target.getBounds();
            target.regX = bounds.width/2;
        }

        public static centerRegY ( target:createjs.DisplayObject ) : void {
            var bounds:createjs.Rectangle = target.getBounds();
            target.regY = bounds.height/2;
        }

        public static centerStage ( target:createjs.DisplayObject ) : void {
            var bridge:sdk.bridge.IBridge = <any>deep.Bridge;
            target.x = bridge.DisplayInfo.StageWidth/2;
            target.y = bridge.DisplayInfo.StageHeight/2;
        }

        public static centerStageX ( target:createjs.DisplayObject ) : void {
            var bridge:sdk.bridge.IBridge = <any>deep.Bridge;
            target.x = bridge.DisplayInfo.StageWidth/2;
        }

        public static centerStageY ( target:createjs.DisplayObject ) : void {
            var bridge:sdk.bridge.IBridge = <any>deep.Bridge;
            target.y = bridge.DisplayInfo.StageHeight/2;
        }

        public static setReg ( target:createjs.DisplayObject, reg:layout.Registration ) : void {
            switch (reg) {
                case layout.Registration.TopLeft:
                    target.regX = 0;
                    target.regY = 0;
                    break;
                case layout.Registration.TopCenter:
                    target.regX = target.getBounds().width / 2;
                    target.regY = 0;
                    break;
                case layout.Registration.TopRight:
                    target.regX = target.getBounds().width;
                    target.regY = 0;
                    break;
                case layout.Registration.CenterRight:
                    target.regX = target.getBounds().width;
                    target.regY = target.getBounds().height / 2;
                    break;
                case layout.Registration.BottomRight:
                    target.regX = target.getBounds().width;
                    target.regY = target.getBounds().height;
                    break;
                case layout.Registration.BottomCenter:
                    target.regX = target.getBounds().width / 2;
                    target.regY = target.getBounds().height;
                    break;
                case layout.Registration.BottomLeft:
                    target.regX = 0;
                    target.regY = target.getBounds().height;
                    break;
                case layout.Registration.CenterLeft:
                    target.regX = 0;
                    target.regY = target.getBounds().height / 2;
                    break;
                case layout.Registration.Center:
                    target.regX = target.getBounds().width / 2;
                    target.regY = target.getBounds().height / 2;
                    break;
                case layout.Registration.Left:
                    target.regX = 0;
                    break;
                case layout.Registration.Right:
                    target.regX = target.getBounds().width;
                    break;
                case layout.Registration.Top:
                    target.regY = 0;
                    break;
                case layout.Registration.Bottom:
                    target.regY = target.getBounds().height;
                    break;
                case layout.Registration.CenterX:
                    target.regX = target.getBounds().width / 2;
                    break;
                case layout.Registration.CenterY:
                    target.regY = target.getBounds().height / 2;
                    break;
            }
        }

        public static windowToStage ( windowPoint:createjs.Point ) : createjs.Point {
            var bridge:sdk.bridge.IBridge = <any>deep.Bridge;
            var stageX:number = (windowPoint.x / bridge.DisplayInfo.RenderScale);
            var stageY:number = (windowPoint.y / bridge.DisplayInfo.RenderScale);
            return new createjs.Point(stageX,stageY);
        }

        public static canvasToStage ( canvasPoint:createjs.Point ) : createjs.Point {
            var bridge:sdk.bridge.IBridge = <any>deep.Bridge;
            var stageX:number = (canvasPoint.x / bridge.DisplayInfo.RenderScale) / deep.Bridge.DisplayInfo.DevicePixelRatio;
            var stageY:number = (canvasPoint.y / bridge.DisplayInfo.RenderScale) / deep.Bridge.DisplayInfo.DevicePixelRatio;
            return new createjs.Point(stageX,stageY);
        }

        public static fntXmlToSpriteSheetData ( images:HTMLImageElement[], fntXml:XMLDocument, normalizeOffsets:boolean=true ) : any {

            var normalizeOffsetX:number;
            var normalizeOffsetY:number;

            if (normalizeOffsets) {
                $(fntXml).find("char").each( ( index:number, element:Element ) => {
                    var el:JQuery = $(element);
                    var id:number = parseInt(el.attr("id"));

                    // Spaces and tabs always have an offset of 0 which will negate any normalizing effects
                    if (id == 9 || id == 32) return;

                    var offsetX:number = parseInt(el.attr("xoffset"));
                    var offsetY:number = parseInt(el.attr("yoffset"));

                    if (normalizeOffsetX == undefined) {
                        normalizeOffsetX = offsetX;
                    } else {
                        normalizeOffsetX = Math.min(normalizeOffsetX, offsetX);
                    }

                    if (normalizeOffsetY == undefined) {
                        normalizeOffsetY = offsetY;
                    } else {
                        normalizeOffsetY = Math.min(normalizeOffsetY, offsetY);
                    }
                } );
            } else {
                normalizeOffsetX = normalizeOffsetY = 0;
            }

            // Spritesheet Data to populate with values from the fntXml.
            var data:any = {
                animations: {},
                images: images,
                frames: []
            };

            // Loop over all the chars in the fntXml and extract the values
            $(fntXml).find("char").each( ( index:number, element:Element ) => {
                var el:JQuery = $(element);
                var id:number = parseInt(el.attr("id"));

                if (id == 9 || id == 32) {
                    // 9 is a tab char
                    // 32 is a space char
                    // In the fnt format, these are included but are not actually in the image.
                    // Instead, they have 0 for all values except xadvance which is the width
                    // of the space or tab (whitespace).
                    // CreateJS defines a space separately and i'm not sure if it handles tabs.
                    // Either way, the data map only defines what is in the image.
                    return;
                }

                // Create frame data for each char.
                // Note that in fntXml, the x and y offset values indicate how far to shift the char from the
                // top-left. In createjs's SpriteSheet data format, the last two values are regX and regY which
                // are the same numbers must be multiplied by -1 to act as an offset in the correct direction.
                // Also, if a page number is not specified, default to 0 as there is only one page (image) to
                // source frames from.
                data.frames.push( [
                    parseInt(el.attr("x")),
                    parseInt(el.attr("y")),
                    parseInt(el.attr("width")),
                    parseInt(el.attr("height")),
                    el[0].hasAttribute("page") ? parseInt(el.attr("page")) : 0,
                    (parseInt(el.attr("xoffset")) - normalizeOffsetX) * -1,
                    (parseInt(el.attr("yoffset")) - normalizeOffsetY) * -1
                ] );

                data.animations[ String.fromCharCode(id) ] = index;
            } );

            return data;
        }

    }

}