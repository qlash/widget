import { IContainer } from '../interfaces/IContainer'
import { IProductOptions } from '../interfaces/IProductOptions'

export class Container implements IContainer {
  private options: IProductOptions = {
    store: 'default',
    language: 'pl',
    description: true,
    image: true,
    price: true
  }

  public constructor(private element: HTMLElement) {
    this.setOptions(this.element.dataset)
  }

  public getProductKey() {
    const { medicover } = this.element.dataset
    
    if (!medicover) {
      throw new Error('Product key not set')
    }

    return medicover
  }

  public getOptions() {
    return this.options
  }

  public getOptionByKey<T extends keyof IProductOptions>(key: T)  {
    return this.options[key]
  }

  public render(html: HTMLElement) {
    this.element.appendChild(html)
  }

  private setOptions(dataset: DOMStringMap) {
    this.options = {
      store: dataset.store ?? this.options.store,
      language: this.getLanguage(dataset.language ?? '', this.options.language),
      image: this.getBoolFromStr(dataset.image, this.options.image),
      description: this.getBoolFromStr(dataset.description, this.options.description),
      price: this.getBoolFromStr(dataset.price, this.options.price),
    }
  }

  private getLanguage(str: string, def: IProductOptions['language']): 'pl'|'en' {
    return ['pl', 'en'].includes(str) ? str as 'pl'|'en': def
  }

  private getBoolFromStr(str: string | undefined, def: boolean): boolean {
    if (str === 'true') {
      return true
    }
    if (str === 'false') {
      return false
    }
    return def
  }
}
