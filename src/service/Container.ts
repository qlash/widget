export interface IContainer {
  getProductKey(): string
  getOptions(): ProductOptions
  getOptionByKey<T extends keyof ProductOptions>(key: T): ProductOptions[T]
  render(html: string): void
}

export type ProductOptions = {
  store: string,
  language: 'pl'|'en',
  description: boolean,
  image: boolean,
  price: boolean
}

export class Container implements IContainer {
  private options: ProductOptions = {
    store: 'default',
    language: 'pl',
    description: true,
    image: true,
    price: true
  }

  public constructor(private el: HTMLElement) {
    this.setOptions(this.el.dataset)
  }

  public getProductKey() {
    const { medicover } = this.el.dataset
    
    if (!medicover) {
      throw new Error('Product key not set')
    }

    return medicover
  }

  public getOptions() {
    return this.options
  }

  public getOptionByKey<T extends keyof ProductOptions>(key: T)  {
    return this.options[key]
  }

  public render(html: string) {
    this.el.innerHTML = html
  }

  private setOptions(dataset: DOMStringMap) {
    this.options = { ...this.options, ...dataset }
  }
}
