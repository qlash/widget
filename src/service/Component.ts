import { IContainer } from './Container'
import { IProduct } from './Product'

export interface IComponent {
  render(): void
}

export class Component implements IComponent {
  public constructor(
    private product: IProduct,
    private container: IContainer
  ) {}

  public async render() {
    const data = await this.product.getData()
    this.container.render(JSON.stringify(data))
  }
}
