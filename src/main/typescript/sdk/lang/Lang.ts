module deep.sdk.lang {

    export const DEFAULT_LANG:string = "en-us";
    export const SUPPORTED_LANG:string[] = ["en-us","zh-cn","zh-tw"];

    export function isLangSupported ( lang:string ) : boolean {
        return SUPPORTED_LANG.indexOf(lang) >= 0;
    }

    export function substitute ( input:string, vars:any[] ) : string {
        var output:string = input;

        for (var i:number=0; i<vars.length; i++) {
            output = output.replace(new RegExp("\\{"+i+"\\}", "g"),vars[i]);
        }

        return output;
    }

}