module deep.sdk.component {

    export interface CountdownStartArguments {
        onComplete?:Function,
        onReady?:Function,
        onThree?:Function,
        onTwo?:Function,
        onOne?:Function,
        soundId?:string
    }

    export class Countdown extends createjs.Container {

        private ready:createjs.Bitmap;
        private three:createjs.Bitmap;
        private two:createjs.Bitmap;
        private one:createjs.Bitmap;

        constructor () {
            super();
            this.ready = new createjs.Bitmap(deep.Bridge.GameAssets.getAsset("__sdk/countdown/lang/ready"));
            this.three = new createjs.Bitmap(deep.Bridge.GameAssets.getAsset("__sdk/countdown/lang/three"));
            this.two = new createjs.Bitmap(deep.Bridge.GameAssets.getAsset("__sdk/countdown/lang/two"));
            this.one = new createjs.Bitmap(deep.Bridge.GameAssets.getAsset("__sdk/countdown/lang/one"));
            utils.CreateJSUtils.centerReg(this.ready);
            utils.CreateJSUtils.centerReg(this.three);
            utils.CreateJSUtils.centerReg(this.two);
            utils.CreateJSUtils.centerReg(this.one);
        }

        public start ( args:CountdownStartArguments ) : void {

            this.removeAllChildren();
            this.addChild(this.ready);
            this.addChild(this.three);
            this.addChild(this.two);
            this.addChild(this.one);
            this.ready.scaleX = this.ready.scaleY = 0;
            this.three.scaleX = this.three.scaleY = 0;
            this.two.scaleX = this.two.scaleY = 0;
            this.one.scaleX = this.one.scaleY = 0;

            createjs.Tween.get(this.ready)
                .wait(300)
                .call(() => {
                    deep.Bridge.Sound.play( (args.soundId) ? args.soundId : "__sdk/countdown/clock");
                    if (args.onReady) args.onReady.apply(null);
                })
                .to({scaleX:1, scaleY:1},500,createjs.Ease.backOut)
                .wait(1000)
                .to({alpha:0},200)
                .call( () => {

                    createjs.Tween.get(this.three)
                        .call(() => {
                            deep.Bridge.Sound.play( (args.soundId) ? args.soundId : "__sdk/countdown/clock");
                            if (args.onThree) args.onThree.apply(null);
                        })
                        .to({scaleX:1, scaleY:1},500,createjs.Ease.backOut)
                        .wait(150)
                        .to({alpha:0},100)
                        .call( () => {

                            createjs.Tween.get(this.two)
                                .call(() => {
                                    deep.Bridge.Sound.play( (args.soundId) ? args.soundId : "__sdk/countdown/clock");
                                    if (args.onTwo) args.onTwo.apply(null);
                                })
                                .to({scaleX:1, scaleY:1},500,createjs.Ease.backOut)
                                .wait(150)
                                .to({alpha:0},100)
                                .call( () => {

                                    createjs.Tween.get(this.one)
                                        .call(() => {
                                            deep.Bridge.Sound.play( (args.soundId) ? args.soundId : "__sdk/countdown/clock");
                                            if (args.onOne) args.onOne.apply(null);
                                        })
                                        .to({scaleX:1, scaleY:1},500,createjs.Ease.backOut)
                                        .wait(150)
                                        .to({alpha:0},100)
                                        .wait(500)
                                        .call( () => {
                                            if (args.onComplete) args.onComplete.apply(null);
                                            this.cleanUp();
                                        });

                                });

                        });
                } );
        }

        public stop () : void {
            this.cleanUp();
        }

        private cleanUp () : void {
            createjs.Tween.removeTweens(this.ready);
            createjs.Tween.removeTweens(this.three);
            createjs.Tween.removeTweens(this.two);
            createjs.Tween.removeTweens(this.one);
            this.removeAllChildren();
        }



    }

}