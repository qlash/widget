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

  public render(html: string) {
    this.element.innerHTML = html
  }

  private setOptions(dataset: DOMStringMap) {
    this.options = { ...this.options, ...dataset }
  }
}
