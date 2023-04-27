import { it, expect, beforeEach, vi } from 'vitest'
import { IContainer } from '../interfaces/IContainer'
import { Component } from '../service/Component'
import { ContainerMock } from './mock/Container'
import { ProductMock } from './mock/Product'

const containerRenderMock = vi.spyOn(ContainerMock.prototype, 'render')

beforeEach(() => {
  vi.clearAllMocks()
})

it('should render all elements in widget', async() => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock() as unknown as IContainer,
  )

  await component.render()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const node = containerRenderMock.calls[0][0].toString()

  expect(node).toContain('__picture')
  expect(node).toContain('__description')
  expect(node).toContain('__price')
})

it('should not render elements in widget', async() => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock({ image: false, description: false, price: false, observe: true }) as unknown as IContainer,
  )

  await component.render()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const node = containerRenderMock.calls[0][0].toString()

  expect(node).not.toContain('__picture')
  expect(node).not.toContain('__description')
  expect(node).not.toContain('__price')
})

it('should change CTA inner text', async() => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock({ ctaText: 'Testowy tekst' }) as unknown as IContainer,
  )

  await component.render()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const node = containerRenderMock.calls[0][0].toString()

  expect(node).not.toContain('Kup teraz')
  expect(node).toContain('Testowy tekst')
})

it('should return correct url for store code', () => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock({ store: 'synevo' }) as unknown as IContainer,
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const url = component.getProductUrl('test')

  expect(url).toContain('synevo.pl')
})

it('shouldn`t add slash at the end of the url', () => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock({ store: 'synevo' }) as unknown as IContainer,
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const url = component.getProductUrl('test')

  expect(url.endsWith('/')).toBeFalsy()
})

it('should add utm_source to url', async() => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock({ utmSource: 'utm-test' }) as unknown as IContainer,
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const url = component.getProductUrl('test')

  expect(url).toContain('utm_source=utm-test')
})

it('should add utm_campaing and utm_medium to url', async() => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock({ utmCampaign: 'utm-kampania', utmMedium: 'utm-media' }) as unknown as IContainer,
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const url = component.getProductUrl('test')

  expect(url).toContain('utm_medium=utm-media')
  expect(url).toContain('utm_campaign=utm-kampania')
})

it('should add "from" price if min and max price differ', async() => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock() as unknown as IContainer,
  )

  await component.render()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const node = containerRenderMock.calls[0][0] as unknown as HTMLElement
  const priceHTML = node.querySelector('[class$="price"]')?.innerHTML || ''

  expect(priceHTML).toContain('od')
})

it('should set title tag', async() => {
  const component = new Component(
    new ProductMock(),
    new ContainerMock({ titleTag: 'h1' }) as unknown as IContainer,
  )

  await component.render()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const node = containerRenderMock.calls[0][0] as unknown as HTMLElement
  const title = node.querySelector('[class$="title"]')!

  expect(title.nodeName).toBe('H1')
})
