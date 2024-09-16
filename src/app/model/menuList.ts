
export class menuList {

  id : number;
  item : string;
  qty : string;
  price : DoubleRange;
  itemPngPath : string;

  constructor(list: menuList) {
    this.id = list.id;
    this.item = list.item;
    this.qty = list.qty;
    this.price = list.price;
    this.itemPngPath = list.itemPngPath;
  }
}

// export class Car {
//   id: number;
//   make: string;
//   model: string;
//   color: string;
//   year: Date;

//   constructor(car) {
//       {
//         this.id = car.id;
//         this.make = car.make || '';
//         this.model = car.model || '';
//         this.color = car.color || '';
//         this.year = new Date(car.year).getYear();
//       }
//   }
// }
