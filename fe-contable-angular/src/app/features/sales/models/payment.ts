export const paymentTypes = {
  empty: { value: 'empty', name: 'Vacio' },
  cash: { value: 'cash', name: 'Efectivo' },
  creditCard: { value: 'creditCard', name: 'Tarjeta Credito' },
  debitCard: { value: 'debitCard', name: 'Tarjeta Debito' },
  personalAccount: { value: 'personalAccount', name: 'Cuenta Personal' },
  transfer: { value: 'transfer', name: 'Transferencia' },
  check: { value: 'check', name: 'Cheque' },
};

export class Payment {
  constructor(
    public type: string = paymentTypes.empty.value,
    public amount: number
  ) {}
}
