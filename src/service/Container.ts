import { renderStatus } from '../enum/renderStatus'
import { StoreCode } from '../enum/StoreCode'
import { IContainer } from '../interfaces/IContainer'
import { I18n, IProductOptions, StoreCodeNames } from '../interfaces/IProductOptions'
import i18n from '../lang/i18n'

export class Container implements IContainer {
  private options: IProductOptions = {
    store: 'default',
    language: 'pl',
    description: true,
    titleTag: 'header',
    observe: false,
    image: true,
    price: true,
    mediclubPrice: false,
  }

  public constructor(private element: HTMLElement) {
    this.clearInnerHtml()
    this.setRenderStatus(renderStatus.PENDING)
    this.setOptions(this.element.dataset)
  }

  public getProductKey() {
    const { medicover } = this.element.dataset

    if (!medicover) {
      throw new Error('Product key not set')
    }

    return medicover
  }

  public getElement() {
    return this.element
  }

  public getOptions() {
    return this.options
  }

  public getOptionByKey<T extends keyof IProductOptions>(key: T) {
    return this.options[key]
  }

  public setRenderStatus(status: renderStatus) {
    this.element.dataset.rendered = status
  }

  public render(html: HTMLElement) {
    this.element.appendChild(html)
    this.setRenderStatus(renderStatus.DONE)
  }

  public clearInnerHtml() {
    this.element.innerHTML = ''
  }

  private setOptions(dataset: DOMStringMap) {
    this.options = {
      store: this.getStore(dataset.store ?? '', this.options.store),
      language: this.getLanguage(dataset.language ?? '', this.options.language),
      image: this.getBoolFromStr(dataset.image, this.options.image),
      description: this.getBoolFromStr(dataset.description, this.options.description),
      price: this.getBoolFromStr(dataset.price, this.options.price),
      mediclubPrice: this.getBoolFromStr(dataset.mediclubPrice, this.options.mediclubPrice),
      titleTag: (dataset.titleTag ?? this.options.titleTag) as keyof HTMLElementTagNameMap,
      observe: this.getBoolFromStr(dataset.observe, false),
      ctaText: dataset.cta,
      utmSource: dataset.utmSource,
      utmCampaign: dataset.utmCampaign,
      utmMedium: dataset.utmMedium,
    }
  }

  private getStore(str: string, def: StoreCodeNames) {
    return Object.keys(StoreCode).includes(str) ? str as StoreCodeNames : def
  }

  private getLanguage(str: string, def: I18n): I18n {
    return Object.keys(i18n).includes(str) ? str as I18n : def
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
