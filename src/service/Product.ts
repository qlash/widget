import { renderStatus } from '../enum/renderStatus'
import productQuery from '../graphql/product-query.graphql'
import { IContainer } from '../interfaces/IContainer'
import { IProduct } from '../interfaces/IProduct'
import { IProductData } from '../interfaces/IProductData'

export class Product implements IProduct {
  private product: IProductData | undefined
  private loaded = false

  public constructor(private container: IContainer) {}

  public async getData(): Promise<IProductData | undefined> {
    if (!this.loaded) {
      this.loaded = true

      try {
        const response = await fetch(`${process.env.API}/graphql?query=${this.getQuery()}&variables=${this.getVariables()}&operationName=products`, {
          headers: {
            accept: '*/*',
            'content-type': 'application/json',
            store: this.getStoreCode(),
          },
          body: undefined,
          method: 'GET',
          mode: 'cors',
          credentials: 'omit',
        })

        const { data: { products: { items } } } = await response.json()

        if (items.length !== 1) {
          throw new Error('Product not exists')
        }

        this.product = items[0]
      } catch {
        this.product = undefined
        this.container.setRenderStatus(renderStatus.ERROR)
      }
    }

    return this.product
  }

  private getStoreCode() {
    let store = this.container.getOptionByKey('store')
    const language = this.container.getOptionByKey('language')

    if (language !== 'en') {
      store += `_${language}`
    }

    return store
  }

  private getQuery() {
    return productQuery.replace(/\s+/g, ' ').trim()
  }

  private getVariables() {
    return JSON.stringify({
      filter: {
        url_key: {
          eq: this.container.getProductKey(),
        },
      },
    })
  }
}
