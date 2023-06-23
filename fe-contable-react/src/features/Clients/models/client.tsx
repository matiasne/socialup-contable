export interface IClient {
  _id?: string;
  name: string;
  image: any;
  city?: string;
  address?: string;
  email: string;
  phone?: string;
  idBusinnes: string;
  postCode?: string;
  documentType?: string;
  documentNumber?: string;
  surname?: string;
  setShouldRefetch?: any;
}
