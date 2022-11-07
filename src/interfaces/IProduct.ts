import { IProductData } from './IProductData'

export interface IProduct {
  getQuery(): string
  getVariables(): string
  getData(): Promise<IProductData | undefined>
}
