export enum statusTypes {
  open = 'open',
  close = 'close',
}

export interface IBoxResponseDTO {
  actualAmount: number;
  createdAt: string;
  dailyAmount: number;
  image: string;
  name: string;
  status: string;
  updatedAt: string;
  _id: string;
}


export class Box {
  constructor(
    public _id: string,
    public idBusiness: string,
    public image: string,
    public name: string,
    public status: statusTypes = statusTypes.close,
    public actualAmount: number,
    public dailyAmount: number
  ) { }

  public static adapt(item: any): Box {
    return new Box(
      item._id,
      item.idBusiness,
      item.image,
      item.name,
      item.status,
      item.actualAmount,
      item.dailyAmount
    );
  }
}



