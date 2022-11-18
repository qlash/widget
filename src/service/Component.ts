import { StoreCode } from '../enum/StoreCode'
import { IComponent } from '../interfaces/IComponent'
import { IContainer } from '../interfaces/IContainer'
import { IProduct } from '../interfaces/IProduct'
import { IProductData } from '../interfaces/IProductData'
import i18n from '../lang/i18n'
import '../scss/style.scss'

export class Component implements IComponent {
  private cssClass = 'medicover-product-widget'

  public constructor(
    private product: IProduct,
    private container: IContainer,
  ) {}

  public async render() {
    const data = await this.product.getData()

    if (data) {
      this.container.render(this.createContainer(data))
    }
  }

  private createElementWithClass<T extends keyof HTMLElementTagNameMap>(element: T, className?: string): HTMLElementTagNameMap[T] {
    const item = document.createElement(element)

    item.classList.add(`${this.cssClass}${className ? `__${className}` : ''}`)

    return item
  }

  private createContainer(data: IProductData) {
    const element = this.createElementWithClass('section')

    const hasImage = this.container.getOptionByKey('image')

    if (hasImage) {
      element.appendChild(this.createImageElement(data))
    }

    element.appendChild(this.createTitleElement(data))
    element.appendChild(this.createCTA(data))

    return element
  }

  private createImageElement(data: IProductData) {
    const element = this.createElementWithClass('picture', 'picture')
    const img = this.createElementWithClass('img', 'image')

    img.src = data.image.url
    img.alt = data.name

    element.appendChild(img)

    return element
  }

  private createTitleElement(data: IProductData) {
    const element = this.createElementWithClass('div', 'main')
    const h2 = this.createElementWithClass('h2', 'title')

    h2.innerText = data.name

    element.appendChild(h2)

    const hasDescription = this.container.getOptionByKey('description')

    if (hasDescription) {
      const p = this.createElementWithClass('p', 'description')

      p.innerHTML = data.description.html

      element.appendChild(p)
    }

    return element
  }

  private createCTA(data: IProductData) {
    const language = this.container.getOptionByKey('language')
    const element = this.createElementWithClass('aside', 'cta')

    const hasPrice = this.container.getOptionByKey('price')

    if (hasPrice) {
      const p = this.createElementWithClass('p', 'price')
      const { price_range: { minimum_price, maximum_price } } = data

      const price = new Intl.NumberFormat(
        language, {
          style: 'currency',
          currency: minimum_price.currency,
        }).format(minimum_price.value)

      const priceRange = minimum_price.value !== maximum_price.value

      p.innerHTML = `${priceRange ? i18n[language].from : ''} ${price}`

      element.appendChild(p)
    }

    const button = this.createElementWithClass('button', 'open')

    button.innerText = this.container.getOptionByKey('ctaText') ?? i18n[language].cta
    button.onclick = () => window.open(this.getProductUrl(data.url_key), '_blank')

    element.appendChild(button)

    return element
  }

  private getProductUrl(urlKey: string) {
    const queryArray: string[] = []
    const utmSource = this.container.getOptionByKey('utmSource')
    const utmCampaign = this.container.getOptionByKey('utmCampaign')
    const utmMedium = this.container.getOptionByKey('utmMedium')

    if (utmSource) {
      queryArray.push(`utm_source=${utmSource}`)
    }

    if (utmCampaign) {
      queryArray.push(`utm_campaign=${utmCampaign}`)
    }

    if (utmMedium) {
      queryArray.push(`utm_medium=${utmMedium}`)
    }

    const query = queryArray.length ? `?${queryArray.join('&')}` : ''

    const storeCodeName = this.container.getOptionByKey('store')
    const domain = StoreCode[storeCodeName]

    return `${domain}${urlKey}/${query}`
  }
}
