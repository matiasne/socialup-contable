export class User {
  constructor(
    public _id: string,
    public name: string,
    public surname: string,
    public email: string,
    public role: string,
    public image: string,
    public gender: string,
    public address: string,
    public phone: string
  ) {}

  public static adapt(item: any): User {
    return new User(
      item._id,
      item.name,
      item.surname,
      item.email,
      item.role,
      item.image,
      item.gender,
      item.address,
      item.phone
    );
  }
}
