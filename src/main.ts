import './scss/styles.scss';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL } from './utils/constants';
import { ProductCatalog } from './components/base/Models/ProductCatalog';
import { BasketModel } from './components/base/Models/BasketModel';
import { BuyerModel } from './components/base/Models/BuyerModel';
import { apiProducts } from './utils/data';

const productCatalog = new ProductCatalog();
const basketModel = new BasketModel();
const buyerModel = new BuyerModel();

productCatalog.setProducts(apiProducts.items);
console.log('Тест каталога (локальные данные):', productCatalog.getProducts());

const firstProduct = productCatalog.getProducts()[0];

basketModel.addItem(firstProduct);
console.log('Корзина после добавления:', basketModel.getItems());
console.log('Количество:', basketModel.getCount());
console.log('Сумма:', basketModel.getTotal());

basketModel.removeItem(firstProduct);
console.log('Корзина после удаления:', basketModel.getItems());

buyerModel.setData({
  payment: 'card',
  address: 'Dubai',
});
console.log('Покупатель (частично):', buyerModel.getData());
console.log('Ошибки:', buyerModel.validate());

const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

webLarekApi.getProducts()
  .then((data) => {
    productCatalog.setProducts(data.items);

    console.log('Каталог товаров, полученный с сервера:', productCatalog.getProducts());
  })
  .catch((error) => {
    console.error('Ошибка получения товаров с сервера:', error);
  });