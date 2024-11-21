import { IProductOptions } from '../../interfaces/IProductOptions'

export class ContainerMock {
  private options: IProductOptions = {
    store: 'default',
    language: 'pl',
    description: true,
    titleTag: 'header',
    image: true,
    price: true,
    mediclubPrice: false,
  }

  public constructor(options: Partial<IProductOptions> = {}) {
    this.options = { ...this.options, ...options }
  }
  public getElement() {
    return document.createElement('div')
  }
  public getProductKey() {
    return 'test-key'
  }
  public getOptions(): Partial<IProductOptions> {
    return this.options
  }
  public getOptionByKey<T extends keyof IProductOptions>(key: T) {
    return this.options[key]
  }
  public render(html: HTMLElement) {
    return html
  }
}
