import { IProductData } from './IProductData'

export interface IProduct {
  getData(): Promise<IProductData | undefined>
}
