export enum paymentTypes {
  empty = 'empty',
  cash = 'cash',
  card = 'card',
  personalAccount = 'personalAccount',
  transfer = 'transfer',
  check = 'check',
}

export class Payment {
  constructor(
    public type: paymentTypes = paymentTypes.empty,
    public amount: number
  ) {}
}
