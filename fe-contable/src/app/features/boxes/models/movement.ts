export class Movement {
    constructor(
        public _id: string,
        public idSale: string,
        public amount: string,
        public type: string,
        public boxAmount: number,
    ) { }
    public static adapt(item: any): Movement {
        return new Movement(
            item._id,
            item.idSale,
            item.amount,
            item.type,
            item.boxAmount,

        )
    }
}