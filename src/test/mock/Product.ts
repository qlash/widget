import { IProduct } from '../../interfaces/IProduct'
import { IProductData } from '../../interfaces/IProductData'

export const productDataMock: IProductData = {
  name: 'Laryngolog',
  url_key: 'laryngolog',
  image: {
    url: 'https://prod-api.medistore.com.pl/media/catalog/product/cache/730e331c92e3b1d780b1f2a31fd6c1dc/l/a/laryngolog_600-550px.jpg',
  },
  description: {
    html: '<p>Doświadczeni laryngolodzy</p>\n\n<p>Najlepsze kliniki w Polsce</p>\n',
  },
  price_range: {
    maximum_price: {
      currency: 'PLN',
      value: 260,
    },
    minimum_price: {
      currency: 'PLN',
      value: 120,
    },
  },
}

export class ProductMock implements IProduct {
  public async getData(): Promise<IProductData | undefined> {
    return new Promise((resolve) => resolve(productDataMock))
  }
}
