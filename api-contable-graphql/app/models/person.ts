export interface IPerson{
    name:string;
    phone: string,
    street: string,
    city: string,
}


export class Person implements IPerson {    

    constructor(
      public name: string,
      public phone: string,
      public street: string,
      public city: string
    ) {}
  
    public static adapt(item: any): Person {
      return new Person(
        item.name,
        item.phone,
        item.street,
        item.city
      );
    }
  }