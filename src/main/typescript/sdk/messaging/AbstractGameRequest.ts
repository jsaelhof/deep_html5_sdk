module deep.sdk.messaging {

    export class AbstractGameRequest {

        protected requestParams:any = {};
        protected requestHeaders:any = {};

        constructor ( private name:string ) {}

        public appendParam ( paramName:string, paramValue:any ) : void {
            if (this.requestParams[paramName] == undefined) {
                this.requestParams[paramName] = paramValue;
            } else {
                throw "Param '"+ paramName +"' already exists on request.";
            }
        }

        public appendHeader ( headerName:string, headerValue:any ) : void {
            if (this.requestHeaders[headerName] == undefined) {
                this.requestHeaders[headerName] = headerValue;
            } else {
                throw "Header '"+ headerName +"' already exists on request.";
            }
        }

        public get Name () : string {
            return this.name;
        }

        public get Params () : any {
            return this.requestParams;
        }

        public get Headers () : any {
            return this.requestHeaders;
        }

    }

}