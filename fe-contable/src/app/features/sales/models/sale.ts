import { Business } from '../../business/models/business';
import { Client } from '../../clients/models/client';
import { Variation } from './variation';
import { SaleProduct } from './SaleProduct';
import { Status } from './status';
import { Payment } from './payment';
import { Box } from '../../boxes/models/box';

export class Sale {
  public client: Client;
  public item: Array<SaleProduct> = [];
  public variations: Array<Variation> = [];
  public total: number = 0;
  public createdAt: string;
  public status: Status;
  public payments: Array<Payment> = [];
  public box: Box;
  constructor(public business: Business) {}
}
