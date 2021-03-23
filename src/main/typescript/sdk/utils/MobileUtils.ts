///<reference path="../device/Orientation.ts"/>

module deep.sdk.utils {

    export class MobileUtils {

        static getDeviceOrientation( windowRef:Window=undefined ):sdk.device.Orientation {

            // Defines which window to target when checking the orientation.
            // Default is this window. Another window reference can be passed to check that window instead.
            var targetWindow:Window = (windowRef !== undefined) ? windowRef : window;

            // First, if this is the Android Default Browser, then screen.orientation is NOT available
            // and window.matchMedia always returns the orientation at the time the game was loaded
            // regardless of its current orientation. Given both methods are unusable, the screen.width and
            // screen.height are checked to see which is longer.
            //
            // If this is NOT the Android Default Browser, then attempt to use screen.orientation. This works
            // better on Android as there is a delay using matchMedia (it doesn't update fast enough on
            // orientation change, so matchMedia still matches the old value).
            //
            // If screen.orientation is not available, fall back to matchMedia which works well on iOS where
            // screen.orientation is not supported.
            if (MobileUtils.isAndroidWebKitBrowser()) {
                if (targetWindow.screen.width > targetWindow.screen.height) {
                    return sdk.device.Orientation.Landscape;
                } else {
                    return sdk.device.Orientation.Portrait;
                }
            } else if (targetWindow.screen["orientation"]) {
                if (/landscape/.test(targetWindow.screen["orientation"].type)) {
                    return sdk.device.Orientation.Landscape;
                } else if (/portrait/.test(targetWindow.screen["orientation"].type)) {
                    return sdk.device.Orientation.Portrait;
                }
            } else {
                if (targetWindow.matchMedia("(orientation: landscape)").matches) {
                    return sdk.device.Orientation.Landscape;
                } else if (targetWindow.matchMedia("(orientation: portrait)").matches) {
                    return sdk.device.Orientation.Portrait;
                }
            }
        }

        static isLandscape( windowRef:Window=undefined ):boolean {
            return MobileUtils.getDeviceOrientation( windowRef ) == sdk.device.Orientation.Landscape;
        }

        static isPortrait( windowRef:Window=undefined ):boolean {
            return MobileUtils.getDeviceOrientation( windowRef ) == sdk.device.Orientation.Portrait;
        }

        static isAndroid() {
            return /(Android)/i.test(navigator.userAgent);
        }

        static getAndroidVersion() {
            if (MobileUtils.isAndroid()) {
                return navigator.userAgent.match(/Android\s(\d\.\d(\.\d)?)/)[0].replace('Android ', '');
            } else {
                throw "Device is not Android";
            }
        }

        static isIOS() {
            return /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
        }

        static isIPad() {
            return /(iPad)/i.test(navigator.userAgent);
        }

        static isIPhone() {
            // Note: The user agent for the facebook app on iPad includes both "iPad" and "iPhone OS".
            // This trips up the regex that checks for "iPhone". So we'll check that iPad is not
            // included before responding whether or not this is an iPhone.
            var isIPad:boolean = MobileUtils.isIPad();
            return /(iPhone)/i.test(navigator.userAgent) && !isIPad;
        }

        static isIPod() {
            return /(iPod)/i.test(navigator.userAgent);
        }


        static isMobileSafari() {
            if (deep.sdk.utils.MobileUtils.isIOS()) {
                if (deep.sdk.utils.MobileUtils.isIPad() || deep.sdk.utils.MobileUtils.isIPhone() || deep.sdk.utils.MobileUtils.isIPod()) {
                    return /(Safari)/i.test(navigator.userAgent) && !/(CriOS)/i.test(navigator.userAgent);
                }
            }
        }

        static getIOSVersion() {
            if (deep.sdk.utils.MobileUtils.isIOS()) {
                return navigator.userAgent.match(/OS\s(\d_\d(_\d)?)/)[0].replace('OS ', '').replace(/_/g, '.');
            } else {
                throw "Device is not iOS";
            }
        }

        static isFullScreen() {
            return "standalone" in window.navigator && window.navigator["standalone"];
        }

        static isDesktop() {
            return (!deep.sdk.utils.MobileUtils.isAndroid()
            && !deep.sdk.utils.MobileUtils.isIOS());
        }

        static isMobile() {
            return !MobileUtils.isDesktop();
        }

        static isFacebookMobile() {
            return /(FBAN|FBAV)/i.test(navigator.userAgent);
        }

        /**
         * For Android 4.0.x-4.3.x, the webkit version of the default browser is 534.30. This version of webkit
         * is *very* buggy when it comes to canvas rendering, but also some other things like detecting the
         * orientation. Its this version of the browser that this method is primarily written to detect.
         *
         * As of Android 4.4, the webkit version is 537.36 and Chrome/28.x.x.x is added to the user agent.
         * This essentially makes it indistinguishable from Chrome (which is likely the point) since the user agent
         * for Chrome 28 on Android is also webkit 537.36. This is the last version of of the default internet browser.
         * In this case, this method will return false even though it really *is* the Android Webkit browser.
         * For our purposes, we will treat it as Chrome since it operates as such and doesn't exhibit the rendering bugs
         * that the 534.30 version does.
         *
         * @returns {boolean}
         */
        static isAndroidWebKitBrowser() {
            var ua:string = navigator.userAgent;
            var isAndroidMobile:boolean = ua.indexOf('Android') > -1 && ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1;
            var regExAppleWebKit:RegExp = /AppleWebKit\/([\d.]+)/;
            var resultAppleWebKitRegEx:RegExpExecArray = regExAppleWebKit.exec(ua);
            var appleWebKitVersion:number = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(ua)[1]));
            var isAndroidBrowser:boolean = isAndroidMobile && appleWebKitVersion !== null && appleWebKitVersion < 537;
            return isAndroidBrowser;
        }


        static isIE10orLess () : boolean {
            return /(MSIE)/i.test(navigator.userAgent);
        }

        static isIE () : boolean {
            return /(Trident|MSIE)/i.test(navigator.userAgent);
        }

        static isIE11 () : boolean {
            return /(Trident)/i.test(navigator.userAgent);
        }

        static isEdge () : boolean {
            return /(Edge)/i.test(navigator.userAgent);
        }

        static isMicrosoftBrowser () : boolean {
            return MobileUtils.isIE() || MobileUtils.isEdge();
        }
    }

}
;