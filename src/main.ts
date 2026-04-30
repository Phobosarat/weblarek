import './scss/styles.scss';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL } from './utils/constants';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { apiProducts } from './utils/data';

const productCatalog = new ProductCatalog();
const basketModel = new BasketModel();
const buyerModel = new BuyerModel();

productCatalog.setProducts(apiProducts.items);

console.log('Тест каталога (локальные данные):', productCatalog.getProducts());

const products = productCatalog.getProducts();

const firstProduct = products[0];
const secondProduct = products[1];
const thirdProduct = products[2];

console.log('Первый товар:', firstProduct);

// Проверка поиска продукта по id
const foundProduct = productCatalog.getProductById(firstProduct.id);

console.log('Поиск продукта по id:', foundProduct);

// Проверка наличия товара по id
console.log(
  'Проверка наличия товара по существующему id:',
  productCatalog.hasProduct(firstProduct.id)
);

console.log(
  'Проверка наличия товара по несуществующему id:',
  productCatalog.hasProduct('wrong-id')
);

// Проверка выбранного продукта
if (foundProduct) {
  productCatalog.setSelectedProduct(foundProduct);
}

console.log('Выбранный продукт:', productCatalog.getSelectedProduct());

// Проверка корзины
basketModel.addItem(firstProduct);
basketModel.addItem(secondProduct);
basketModel.addItem(thirdProduct);

console.log('Корзина после добавления нескольких товаров:', basketModel.getItems());
console.log('Количество товаров в корзине:', basketModel.getCount());
console.log('Сумма корзины:', basketModel.getTotal());

// Проверка удаления одного товара
basketModel.removeItem(secondProduct);

console.log('Корзина после удаления одного товара:', basketModel.getItems());
console.log('Количество после удаления:', basketModel.getCount());
console.log('Сумма после удаления:', basketModel.getTotal());

// Проверка очистки корзины
basketModel.clear();

console.log('Корзина после полной очистки:', basketModel.getItems());
console.log('Количество после очистки:', basketModel.getCount());
console.log('Сумма после очистки:', basketModel.getTotal());

// Проверка модели покупателя
buyerModel.setData({
  payment: 'card',
  address: 'Dubai',
  email: 'test@mail.com',
  phone: '+971500000000',
});

console.log('Покупатель до очистки:', buyerModel.getData());
console.log('Ошибки покупателя до очистки:', buyerModel.validate());

// Проверка очистки модели покупателя
buyerModel.clear();

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