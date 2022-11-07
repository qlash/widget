import productQuery from '../graphql/product-query.graphql'
import { IContainer } from './Container'

export interface IPrice {
  currency: string;
  value: number;
}

export interface IProductData {
  name: string;
  description: {
    html: string;
  }
  image: {
    url: string;
  }
  price_range: {
    minimum_price: IPrice
  }
}

export interface IProduct {
  getQuery(): string
  getVariables(): string
  getData(): Promise<IProductData | undefined>
}

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
        const res = await fetch(`${process.env.API}/graphql?query=${this.getQuery()}&variables=${this.getVariables()}&operationName=products`, {
          headers: {
            accept: '*/*',
            'content-type': 'application/json',
            store: `${this.container.getOptionByKey('store')}_${this.container.getOptionByKey('language')}`
          },
          body: null,
          method: 'GET',
          mode: 'cors',
          credentials: 'omit'
        })

        const json = await res.json()
        this.product = json.data.products.items[0]
      } catch {
        this.product = undefined
      }
      
      this.loaded = true
    }

    return this.product
  }
}
