import { Box, stateTypes } from 'src/app/features/boxes/models/box';
import { Business } from '../../features/business/models/business';
import { User } from '../../models/user';

export class Session {
  public user = new User('', '', '', '', '', '', '', '', '');
  public business = new Business('', '', '', '', '', '', '', '');
  public box = new Box ('', '', '', '', stateTypes.close ,0,0);

  constructor(public token: string, user?: User, business?: Business, box?: Box ) {
    this.user = user;
    this.business = business;
    this.box = box;
  }
}
