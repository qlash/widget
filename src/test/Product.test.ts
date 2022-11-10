import { it, expect, beforeEach, beforeAll, vi } from 'vitest'
import { IContainer } from '../interfaces/IContainer'
import { Container } from '../service/Container'

const testUrlKey = 'testing_url_key'
const graphqlContent = 'graphql-query'

import { Product } from '../service/Product'

vi.stubGlobal('fetch', vi.fn())

vi.mock('../graphql/product-query.graphql', () => ({
  default: graphqlContent,
}))

let container: IContainer

beforeAll(() => {
  const element = document.createElement('div')

  element.dataset.medicover = testUrlKey

  container = new Container(element)
})

beforeEach(() => {
  vi.clearAllMocks()
})

it('should set url_key on variables', () => {
  const product = new Product(container)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const variables = product.getVariables()

  expect(variables).toContain(testUrlKey)
})

it('should fetch with graphql and url_key', () => {
  const product = new Product(container)

  product.getData()

  expect(fetch).toBeCalledWith(expect.stringContaining(graphqlContent), expect.anything())
  expect(fetch).toBeCalledWith(expect.stringContaining(testUrlKey), expect.anything())
})

it('should return correct store_name', () => {
  const product = new Product(container)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const storeCode = product.getStoreCode()

  expect(storeCode).toBe('default_pl')
})

it('should fetch for english store_code without language in param', () => {
  const customElement = document.createElement('div')

  customElement.dataset.medicover = 'test'
  customElement.dataset.store = 'synevo'
  customElement.dataset.language = 'en'

  const customContainer = new Container(customElement)
  const customProduct = new Product(customContainer)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  const storeCode = customProduct.getStoreCode()

  expect(storeCode).toBe('synevo')
})

it('should fetch data only once', () => {
  const product = new Product(container)

  product.getData()
  product.getData()

  expect(fetch).toBeCalledTimes(1)
})
