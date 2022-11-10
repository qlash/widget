import { IPrice } from './IPrice'

export interface IProductData {
  name: string
  url_key: string
  description: {
    html: string
  }
  image: {
    url: string
  }
  price_range: {
    maximum_price: IPrice
    minimum_price: IPrice
  }
}
