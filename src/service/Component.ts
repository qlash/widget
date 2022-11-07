import { IComponent } from '../interfaces/IComponent'
import { IContainer } from '../interfaces/IContainer'
import { IProduct } from '../interfaces/IProduct'

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
