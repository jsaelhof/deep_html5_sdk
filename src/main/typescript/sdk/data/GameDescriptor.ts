module deep.sdk.data {

    export class GameDescriptor {

        private fileHash:any = {};

        constructor ( private descriptor:IGameDescriptor, private gameContext:string ) {
            this.parseGameDescriptorBlock(descriptor.files.skin, gameContext);
        }

        private parseGameDescriptorBlock ( block:IGameDescriptorElement[], context:string ) : void {
            for (var i:number=0; i<block.length; i++) {
                var e:IGameDescriptorElement = block[i];

                // Add the context in front of the relative source in the descriptor file.
                e.src = context + "/" + e.src;

                if (this.fileHash[e.id] === undefined) {
                    this.fileHash[e.id] = e;
                } else {
                    throw "ERROR: A file with the id '"+ e.id +"' already exists."
                }

                if (e.removed !== true) e.removed = false;
            }
        }

        public getFilesToPreload ( preloadFilter?:string ) : IGameDescriptorElement[] {
            var a:IGameDescriptorElement[] = [];

            for (var id in this.fileHash) {
                var e:IGameDescriptorElement = this.fileHash[id];
                // If the preloadFilter is undefined, load it
                // If skipPreload is not defined, load it
                // If skipPreload is defined, only preload elements if the preloadFilter is NOT in the list
                if (preloadFilter === undefined || e.skipPreload === undefined || e.skipPreload.indexOf(preloadFilter) < 0) {
                    a.push(e);
                }
            }

            return a;
        }

        public getColor ( id:string ) : string {
            if (this.descriptor.data.colors[id]) {
                return this.descriptor.data.colors[id].value;
            } else {
                throw "ERROR: No color with id '"+ id +"' exists";
            }
        }

        public getProperty ( id:string ) : any {
            if (this.descriptor.data.properties[id]) {
                return this.descriptor.data.properties[id].value;
            } else {
                throw "ERROR: No property with id '"+ id +"' exists";
            }
        }

        public hasText ( id:string ) : boolean {
            if (this.descriptor.data.text[id]) {
                return !this.descriptor.data.text[id].removed;
            } else {
                throw "ERROR: No text element with id '"+ id +"' exists";
            }
        }

        public getText ( id:string ) : any {
            if (this.descriptor.data.text[id]) {
                return this.descriptor.data.text[id].value;
            } else {
                throw "ERROR: No text element with id '"+ id +"' exists";
            }
        }

        public get Properties () : any {
            // Clone the object and return it
            var props:any = {};
            for (var a in this.descriptor.data.properties) {
                props[a] = this.descriptor.data.properties[a].value;
            }
            return JSON.parse(JSON.stringify(props));
        }

        public hasLang ( lang:string ) : boolean {
            return this.descriptor.lang.hasOwnProperty(lang);
        }

        public getLang ( lang:string ) : string {
            return this.gameContext + "/" + this.descriptor.lang[lang];
        }

        public hasDemo () : boolean {
            return this.descriptor.demo;
        }

        public getSkinFile ( id:string ) : IGameDescriptorElement {
            for (var element of this.descriptor.files.skin) {
                if (id === element.id) {
                    return element;
                }
            }

            throw "ERROR: No skin element with id '"+ id +"' exists";
        }

        public getLoaderFile ( id:string ) : IGameDescriptorElement {
            for (var element of this.descriptor.files.loader) {
                if (id === element.id) {
                    return element;
                }
            }

            throw "ERROR: No loader element with id '"+ id +"' exists";
        }

        public hasPrizes () : boolean {
            return this.descriptor.prizes !== undefined;
        }

        public getPrizeConf ( prizeId:string ) : IPrizeConfElement {
            for (var element of this.descriptor.prizes.prizeList) {
                if (element.prizeId === prizeId) {
                    return element;
                }
            }

            throw "ERROR: No prize conf with prizeId '"+ prizeId +"' exists";
        }

        public getPrizes ( assignedOnly:boolean=true ) : IPrizeConfElement[] {
            if (this.descriptor.prizes && this.descriptor.prizes.prizeList) {
                return this.descriptor.prizes.prizeList.filter( ( element:IPrizeConfElement ) => {
                    if (!assignedOnly || element.prizeId !== null ) return element;
                } );
            } else {
                throw "ERROR: Game Descriptor contains no prizes. Use hasPrizes to check if the game supports prizes first.";
            }
        }

        public getMinPrizes () : number {
            return this.descriptor.prizes.min;
        }

        public getMaxPrizes () : number {
            return this.descriptor.prizes.max;
        }
    }

    export interface IGameDescriptor {
        prizes: IPrizes
        data: {
            colors: {}
            properties: {}
            text: {}
        }
        files: {
            skin: IGameDescriptorElement[],
            loader: IGameDescriptorElement[]
        }
        demo: boolean
        lang: {}
    }

    export interface IGameDescriptorElement {
        type: string
        src: string
        id: string
        width?: number
        height?: number
        skipPreload?: string[]
        removable?: boolean
        removed?: boolean
        langs?: string[]
        skill?: string
        logo?: boolean
        imageWidth?: number
        imageHeight?: number
        duration?: number
        feature?: {
            prizes?: {
                enabled?: boolean
            }
        }
        animation?: {
            frame?: {
                width?: number
                height?: number
            }
            framerate: number
        }
        //settings?: {}
    }

    export interface IPrizes {
        min: number
        max: number
        prizeList: IPrizeConfElement[]
    }

    export interface IPrizeConfElement {
        prizeId: string
        winPercent: string
        elements?: {
            data?: {
                colors?: string[]
                properties?: string[]
                text?: string[]
            }
            files?: {
                skin?: string[]
            }
        }
    }

}