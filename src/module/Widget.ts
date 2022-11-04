import productQuery from '../graphql/product-query.graphql'
import IProduct from './IProduct'

export default class Widget {

  public constructor(private el: HTMLElement) {
    console.log(this.render())
  }

  private getVariables() {
    return JSON.stringify({
      filter: {
        url_key: {
          eq: this.el.dataset.medicover
        }
      }
    })
  }

  private getQuery() {
    return productQuery.replace(/\s+/g, ' ').trim()
  }

  public async getData(): Promise<IProduct> {
    const req = await fetch(`${process.env.API}/graphql?query=${this.getQuery()}&variables=${this.getVariables()}&operationName=products`, {
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        store: 'default_pl'
      },
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    })

    const res = await req.json()
    return res.data.products.items[0]
  }

  public async render() {
    const data = await this.getData()
    this.el.innerText = JSON.stringify(data)
  }
}
