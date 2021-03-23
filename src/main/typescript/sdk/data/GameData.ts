module deep.sdk.data {

    export class GameData {
        constructor ( private data:IGameData ) {}
        public get GameId () : string { return this.data.info.gameId; }
        public get Orientation () : string { return this.data.info.orientation; }
        public get Width () : number { return this.data.info.width; }
    }

    export interface IGameData {
        info: {
            gameId: string
            orientation: string
            width: number
        }

        skins: string[]
    }

}