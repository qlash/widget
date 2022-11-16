import { StoreCode } from '../enum/StoreCode'
import i18n from '../lang/i18n'

export type I18n = keyof typeof i18n
export type StoreCodeNames = keyof typeof StoreCode

export interface IProductOptions {
  store: StoreCodeNames;
  language: I18n
  description: boolean
  image: boolean
  price: boolean
  ctaText?: string
  utmSource?: string
}
