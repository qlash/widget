import i18n from '../lang/i18n'

export type I18n = keyof typeof i18n

export interface IProductOptions {
  store: string
  language: I18n
  description: boolean
  image: boolean
  price: boolean
  ctaText: string|undefined
  utmSource: string|undefined
}
