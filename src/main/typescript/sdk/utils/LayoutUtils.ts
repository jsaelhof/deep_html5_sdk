module deep.sdk.utils {

    export class LayoutUtils {

        public static applyProps ( obj:any, props:any, subs:any={} ) : void {
            for ( var prop in props ) {
                if ( props.hasOwnProperty(prop) ) {
                    if (/{.*}/.test(props[prop])) {
                        for (var sub in subs) {
                            if ( subs.hasOwnProperty(sub) ) {
                                props[prop] = props[prop].replace("{"+sub+"}", subs[sub]);
                            }
                        }
                    }
                    obj[prop] = props[prop];
                }
            }
        }

    }

}