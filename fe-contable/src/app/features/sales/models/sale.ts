import { Business } from '../../business/models/business';
import { Client } from '../../clients/models/client';
import { Variation } from './variation';
import { SaleProduct } from './SaleProduct';
import { Status } from './status';
import { Payment } from './payment';
import { Box } from '../../boxes/models/box';


export class Sale {
  public idClient: String;
  public idBusiness: String;
  public client: Client;
  public box?: Box;
  public item: Array<SaleProduct> = [];
  public variations: Array<Variation> = [];
  public total: number = 0;
  public createdAt: string;
  public status: Status;
  public payments: Array<Payment> = [];
  public boxId: string;
  constructor(public business: Business) { }
}
