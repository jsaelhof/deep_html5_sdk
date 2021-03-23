module deep.sdk.utils {

    export class ColorUtils {

        public static luminance (hex:string, lum:number) : string {
            hex = ColorUtils.expandShorthandHex(hex);

            // validate hex string
            hex = hex.replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            lum = lum || 0;

            // convert to decimal and change luminosity
            var rgb:string = "#"
            for (var i:number = 0; i < 3; i++) {
                var c:number = parseInt(hex.substr(i*2,2), 16);
                var s:string = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00"+s).substr(s.length);
            }

            return rgb;
        }

        public static hexToRGBA (hex:string, alpha:number) : string {
            hex = ColorUtils.expandShorthandHex(hex);

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            if (alpha > 1) {
                alpha = 1;
            } else if (alpha < 0) {
                alpha = 0;
            }

            var components:number[] = [
                parseInt(result[1],16),
                parseInt(result[2],16),
                parseInt(result[3],16),
                alpha
            ];

            return result ? "rgba("+ components.join(",") +")" : null;
        }

        public static hexToRGBComponents (hex:string) : number[] {
            hex = ColorUtils.expandShorthandHex(hex);
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            var components:number[] = [
                parseInt(result[1],16),
                parseInt(result[2],16),
                parseInt(result[3],16)
            ];

            return components;
        }

        public static hexToRGB (hex:string) : string {
            var components:number[] = ColorUtils.hexToRGBComponents(hex);
            return components != null ? "rgba("+ components.join(",") +")" : null;
        }

        public static RGBToHex(r:number, g:number, b:number) {
            var componentToHex:Function = function ( color:number ) : string {
                var hex:string = color.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };

            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        public static hexToInt(hex:string) : number {
            if (hex.charAt(0) === "#") hex = hex.replace("#","");
            if (hex.charAt(0) === "0" && hex.charAt(1) === "x") hex = hex.replace("0x","");
            return parseInt(hex,16);
        }

        public static RGBToInt (rgb:string) : number {
            var regex:RegExp = /(rgba?\(([0-9][0-9]?[0-9]?),([0-9][0-9]?[0-9]?),([0-9][0-9]?[0-9]?),?([\d\.]+)\))/g;
            var result:RegExpExecArray = regex.exec(rgb);
            if (result === null) {
                throw "Failed to parse color '"+rgb+"'";
            }
            var hex:string = ColorUtils.RGBToHex(parseInt(result[2]),parseInt(result[3]),parseInt(result[4]));
            return ColorUtils.hexToInt(hex);
        }

        public static ColorStringToInt(colorString:string) : number {
            // Lowercase any uppercase letters
            colorString = colorString.toLowerCase();

            if (colorString.charAt(0) === "#") {
                // Handle a hex value starting with a # (ex (#000000, #000)
                return ColorUtils.hexToInt(colorString);
            } else if (colorString.substr(0,2) === "0x") {
                // Handle a hex value starting with 0x (ex 0x000000)
                return ColorUtils.hexToInt(colorString);
            } else if (colorString.substr(0,3) === "rgb") {
                // Handle an rgb or rgba value
                return ColorUtils.RGBToInt(colorString);
            } else if (colorString.substr(0,3) === "hsl") {
                // Handle an hsl or hsla value
                throw "HSL and HSLA color values are not supported";
            }
        }

        public static expandShorthandHex ( hex:string ) : string {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });
            return hex;
        }

        // Create a filter that will modify the filtered object to the specified color..
        public static getColorFilter ( hex:string ) : createjs.ColorFilter {
            var components = ColorUtils.hexToRGBComponents(hex);

            // The first three args multiply the R,G,B values by the value of 0.
            // This makes all three color components black.
            // The fourth arg multiplies the alpha by 1 (leaves it the same)
            // The last three args add an amount of color to each channel
            return new createjs.ColorFilter(0,0,0,1,components[0],components[1],components[2]);
        }
    }

}