import { IProductOptions } from './IProductOptions'

export interface IContainer {
  getProductKey(): string
  getOptions(): IProductOptions
  getOptionByKey<T extends keyof IProductOptions>(key: T): IProductOptions[T]
  render(html: string): void
}
