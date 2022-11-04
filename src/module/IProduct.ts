export default interface IProduct {
  name: string;
  description: {
    html: string;
  }
  image: {
    url: string;
  }
  price_range: {
    minimum_price: {
      currency: string;
      value: number;
    }
  }
}
