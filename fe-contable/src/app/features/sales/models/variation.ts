export enum VariationType {
  empty = 'empty',
  percentage = '%',
  amount = '$',
}

export class Variation {
  public type: VariationType = VariationType.empty;
  public value: number = 0;
  public description: string = '';

  constructor() {}
}
