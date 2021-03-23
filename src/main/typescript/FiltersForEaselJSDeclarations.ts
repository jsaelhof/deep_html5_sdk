/**
 * IMPORTANT
 *
 * This file declares new classes that extend createjs by adding new filters.
 * These were not written by us and are provided as plain javascript.
 * These declarations are added here so that they get included in the d.ts file for the SDK lib.
 */
declare module createjs {
    class DropShadowFilter extends createjs.Filter {
        constructor (distance?:number, angle?:number, color?:number, alpha?:number, blurX?:number, blurY?:number, strength?:number, quality?:number, inner?:boolean, knockout?:boolean, hideObject?:boolean);
    }

    class GlowFilter extends createjs.Filter {
        constructor(color?:number, alpha?:number, blurX?:number, blurY?:number, strength?:number, quality?:number, inner?:boolean, knockout?:boolean);
    }
}