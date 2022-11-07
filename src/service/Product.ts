import productQuery from '../graphql/product-query.graphql'
import { IContainer } from '../interfaces/IContainer'
import { IProduct } from '../interfaces/IProduct'
import { IProductData } from '../interfaces/IProductData'

export class Product implements IProduct {
  private product: IProductData | undefined
  private loaded = false

  public constructor(private container: IContainer) {}

  public getQuery(): string {
    return productQuery.replace(/\s+/g, ' ').trim()
  }

  public getVariables(): string {
    return JSON.stringify({
      filter: {
        url_key: {
          eq: this.container.getProductKey()
        }
      }
    })
  }

  public async getData(): Promise<IProductData | undefined> {
    if (!this.loaded) {
      try {
        const response = await fetch(`${process.env.API}/graphql?query=${this.getQuery()}&variables=${this.getVariables()}&operationName=products`, {
          headers: {
            accept: '*/*',
            'content-type': 'application/json',
            store: `${this.container.getOptionByKey('store')}_${this.container.getOptionByKey('language')}`
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
}
