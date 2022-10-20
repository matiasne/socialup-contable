export enum stateTypes {
  open = 'open',
  close = 'close',
}

export class Box {
  constructor(
    public _id: string,
    public idBusiness: string,
    public image: string,
    public name: string,
    public state: stateTypes = stateTypes.close, //definir emun
    public actualAmount: number,
    public dailyAmount: number
  ) {}

  public static adapt(item: any): Box {
    return new Box(
      item._id,
      item.idBusiness,
      item.image,
      item.name,
      item.state,
      item.actualAmount,
      item.dailyAmount
    );
  }
}
