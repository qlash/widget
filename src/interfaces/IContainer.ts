import { renderStatus } from '../enum/renderStatus'
import { IProductOptions } from './IProductOptions'

export interface IContainer {
  getElement(): HTMLElement
  getProductKey(): string
  getOptions(): IProductOptions
  clearInnerHtml(): void
  getOptionByKey<T extends keyof IProductOptions>(key: T): IProductOptions[T]
  setRenderStatus(status: renderStatus): void
  render(html: HTMLElement): void
}
