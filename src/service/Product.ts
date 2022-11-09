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
      try {
        let store = this.container.getOptionByKey('store')
        const language = this.container.getOptionByKey('language')
        if (language !== 'en') {
          store += `_${language}`
        }

        const response = await fetch(`${process.env.API}/graphql?query=${this.getQuery()}&variables=${this.getVariables()}&operationName=products`, {
          headers: {
            accept: '*/*',
            'content-type': 'application/json',
            store
          },
          body: undefined,
          method: 'GET',
          mode: 'cors',
          credentials: 'omit'
        })

        const json = await response.json()
        this.product = json.data.products.items[0]
      } catch {
        this.product = undefined
      }
      
      this.loaded = true
    }

    return this.product
  }

  private getQuery() {
    return productQuery.replace(/\s+/g, ' ').trim()
  }

  private getVariables() {
    return JSON.stringify({
      filter: {
        url_key: {
          eq: this.container.getProductKey()
        }
      }
    })
  }
}
