module deep.sdk.messaging {

    export class PlayResultResponse {

        /*response object: {
            "ready": true,
            "outcome": "bigwin",
            "drawEntered": true,
            "claimCode": "_1zXc4ZGzIPs7zlNtQR0V45JjY5wzirxZkKZV5TJ6gQ",
            "prizeList": {
                "Gd734abf6_fa06_421f_925c_1ddb55451ca3": {
                    "id": "Gd734abf6_fa06_421f_925c_1ddb55451ca3",
                    "title": "First 5 Win",
                    "description": "First 5 Win",
                    "image": "",
                    "type": "firstPlay",
                    "product_type": "incentive"
                },
                "DRAW_ENTRY_AWARD": {
                    "id": "DRAW_ENTRY_AWARD"
                },
                "Gf16640da_8260_4c9e_ba6a_34be59e638ba": {
                    "id": "Gf16640da_8260_4c9e_ba6a_34be59e638ba",
                    "title": "Everybody Wins",
                    "description": "Everybody Wins",
                    "image": "",
                    "type": "giveaway",
                    "product_type": "incentive"
                }
            }
        }*/

        /*
         Prize Properties
         String id
         String title
         String description
         String image
         String imagePath
         String url
         String urlText
         String type
         String productType
        */

        constructor (
            private response:{
                ready:boolean,
                outcome:string,
                drawEntered:boolean,
                prizeList:any,
                claimCode:string
            }
        ) {}

        public get Ready () : boolean {
            return this.response.ready;
        }

        public get Result () : sdk.gameplay.PlayResult {
            return sdk.gameplay.PlayResult[this.response.outcome.toUpperCase()];
        }

        public get PrizeList () : any {
            return this.response.prizeList;
        }

        public get DrawEntered () : boolean {
            return this.response.drawEntered;
        }

    }

}