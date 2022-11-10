import { Container } from '../service/Container'
import { it, expect, beforeEach } from 'vitest'

let element: HTMLElement

beforeEach(() => {
  element = document.createElement('div')
  element.dataset.medicover = 'test'
})

it('should return url_key', () => {
  const container = new Container(element)

  expect(container.getProductKey()).toBe('test')
})

it('should throw when url_key not set', () => {
  const div = document.createElement('div')
  const container = new Container(div)

  expect(() => container.getProductKey()).toThrowError('Product key not set')
})

it('should set default options', () => {
  const container = new Container(element)

  expect(container.getOptions()).toEqual({
    store: 'default',
    language: 'pl',
    image: true,
    description: true,
    price: true,
    ctaText: undefined,
  })
})

it('should return specific option', () => {
  const container = new Container(element)

  expect(container.getOptionByKey('image')).toBe(true)
})

it('should read options set on element', () => {
  const customElement = document.createElement('div')

  customElement.dataset.medicover = 'test'
  customElement.dataset.image = 'false'
  customElement.dataset.description = 'false'
  customElement.dataset.price = 'false'
  customElement.dataset.store = 'synevo'
  customElement.dataset.language = 'en'
  customElement.dataset.cta = 'Kupuj u nas'

  const container = new Container(customElement)

  expect(container.getOptions()).toEqual({
    store: 'synevo',
    language: 'en',
    image: false,
    description: false,
    price: false,
    ctaText: 'Kupuj u nas',
  })
})
