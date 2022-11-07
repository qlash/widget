import { IComponent } from '../interfaces/IComponent'
import { IContainer } from '../interfaces/IContainer'
import { IProduct } from '../interfaces/IProduct'
import { IProductData } from '../interfaces/IProductData'
import '../scss/style.scss'

export class Component implements IComponent {
  private cssClass = 'medicover-product-widget'

  public constructor(
    private product: IProduct,
    private container: IContainer
  ) {}

  public async render() {
    const data = await this.product.getData()

    if (data) {
      this.container.render(this.createContainer(data))
    }
  }

  private createContainer(data: IProductData) {
    const element = document.createElement('section')
    element.classList.add(this.cssClass)

    const hasImage = this.container.getOptionByKey('image')
    if (hasImage) {
      element.appendChild(this.createImageElement(data))
    }

    element.appendChild(this.createTitleElement(data))
    element.appendChild(this.createCTA(data))

    return element
  }

  private createImageElement(data: IProductData) {
    const element = document.createElement('picture')
    element.classList.add(`${this.cssClass}__picture`)

    const img = document.createElement('img')
    img.classList.add(`${this.cssClass}__image`)
    img.src = data.image.url
    img.alt = data.name

    element.appendChild(img)

    return element
  }
  
  private createTitleElement(data: IProductData) {
    const element = document.createElement('div')
    element.classList.add(`${this.cssClass}__main`)
    const h2 = document.createElement('h2')
    h2.classList.add(`${this.cssClass}__title`)
    h2.innerText = data.name

    element.appendChild(h2)

    const hasDescription = this.container.getOptionByKey('description')
    if (hasDescription) {
      const p = document.createElement('p')
      p.classList.add(`${this.cssClass}__description`)
      p.innerHTML = data.description.html

      element.appendChild(p)
    }

    return element
  }

  private createCTA(data: IProductData) {
    const element = document.createElement('aside')
    element.classList.add(`${this.cssClass}__cta`)

    const hasPrice = this.container.getOptionByKey('price')
    if (hasPrice) {
      const p = document.createElement('p')
      p.classList.add(`${this.cssClass}__price`)

      const price = new Intl.NumberFormat(
        this.container.getOptionByKey('language'), { 
          style: 'currency', currency: data.price_range.minimum_price.currency 
        }).format(data.price_range.minimum_price.value)

      const priceRange = data.price_range.minimum_price.value === data.price_range.maximum_price.value

      p.innerHTML = `${priceRange ? 'od' : ''} ${price}`

      element.appendChild(p)
    }

    const button = document.createElement('button')
    button.classList.add(`${this.cssClass}__open`)
    button.innerText = 'Kup teraz'
    button.onclick = () => window.open(`http://medistore.com.pl/p/${data.url_key}/`, '_blank')

    element.appendChild(button)

    return element
  }
}
