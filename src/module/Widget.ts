import { Component, IComponent } from '../service/Component'
import { IContainer, Container } from '../service/Container'
import { IProduct, Product } from '../service/Product'

export default class Widget {
  private container: IContainer
  private product: IProduct
  private component: IComponent

  public constructor(private el: HTMLElement) {
    this.container = new Container(el)
    this.product = new Product(this.container)
    this.component = new Component(this.product, this.container)

    this.component.render()
  }
}
