import { IPrice } from './IPrice'

export interface IProductData {
  name: string;
  description: {
    html: string;
  }
  image: {
    url: string;
  }
  price_range: {
    minimum_price: IPrice
  }
}
