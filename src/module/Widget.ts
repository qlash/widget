import { IComponent } from '../interfaces/IComponent'
import { IContainer } from '../interfaces/IContainer'
import { IProduct } from '../interfaces/IProduct'
import { Component } from '../service/Component'
import { Container } from '../service/Container'
import { Product } from '../service/Product'

export default class Widget {
  private container: IContainer
  private product: IProduct
  private component: IComponent

  public constructor(element: HTMLElement) {
    this.container = new Container(element)
    this.product = new Product(this.container)
    this.component = new Component(this.product, this.container)

    this.component.render()
  }
}
