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

  expect(container.getOptions()).toContain({
    store: 'default',
    language: 'pl',
    image: true,
    description: true,
    price: true,
    titleTag: 'header',
    ctaText: undefined,
    utmSource: undefined,
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
    titleTag: 'header',
  })
})

it('should set title tag', () => {
  const customElement = document.createElement('div')

  customElement.dataset.medicover = 'test'
  customElement.dataset.titleTag = 'h2'

  const container = new Container(customElement)

  expect(container.getOptions()).toContain({
    titleTag: 'h2',
  })
})

it('should clear inner HTML after call', () => {
  const customElement = document.createElement('div')

  customElement.innerHTML = '<div>Test</div>'

  new Container(customElement)
  expect(customElement.innerHTML).toBe('')
})
