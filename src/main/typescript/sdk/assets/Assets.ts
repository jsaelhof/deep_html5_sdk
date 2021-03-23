
module deep.sdk.assets {

    export class Assets {

        private assets:any = {};

        public addAsset ( id:string, asset:any ) : void {
            if (!this.hasAsset(id)) {
                this.assets[id] = asset;
            } else {
                throw "An asset already exists with id '"+ id +"'";
            }
        }

        public hasAsset ( id:string ) : boolean {
            return this.assets[id] !== undefined;
        }

        public getAsset ( id:string ) : any {
            if (this.hasAsset(id)) {
                return this.assets[id];
            } else {
                throw "No asset exists with id '"+ id +"'";
            }
        }

    }

}