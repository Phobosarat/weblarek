import './scss/styles.scss';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/events';
import { WebLarekApi } from './components/WebLarekApi';

import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';

import { ProductCatalog } from './components/Models/ProductCatalog';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';

import { Page } from './components/view/Page';
import { Header } from './components/view/Header';
import { CatalogCard } from './components/view/CatalogCard';

import { Modal } from './components/view/Modal';
import { PreviewCard } from './components/view/PreviewCard';

import { Basket } from './components/view/Basket';
import { BasketCard } from './components/view/BasketCard';

import { OrderForm } from './components/view/OrderForm';
import { ContactsForm } from './components/view/ContactsForm';
import { Success } from './components/view/Success';

import { TPayment } from './types';

const events = new EventEmitter();

const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

const productCatalog = new ProductCatalog(events);
const basketModel = new BasketModel(events);
const buyerModel = new BuyerModel(events);

const page = new Page(document.body);
const header = new Header(document.body, {
  onClick: () => events.emit('basket:open'),
});

const modalContainer = document.querySelector<HTMLElement>('#modal-container')!;

const cardCatalogTemplate = document.querySelector<HTMLTemplateElement>('#card-catalog')!;
const cardPreviewTemplate = document.querySelector<HTMLTemplateElement>('#card-preview')!;
const cardBasketTemplate = document.querySelector<HTMLTemplateElement>('#card-basket')!;

const basketTemplate = document.querySelector<HTMLTemplateElement>('#basket')!;
const orderTemplate = document.querySelector<HTMLTemplateElement>('#order')!;
const contactsTemplate = document.querySelector<HTMLTemplateElement>('#contacts')!;
const successTemplate = document.querySelector<HTMLTemplateElement>('#success')!;

const previewCard = new PreviewCard(
  cloneTemplate<HTMLElement>(cardPreviewTemplate),
  {
    onClick: () => {
      const product = productCatalog.getSelectedProduct();

      if (!product) {
        return;
      }

      if (basketModel.hasItem(product.id)) {
        basketModel.removeItem(product);
      } else {
        basketModel.addItem(product);
      }

      modal.close();
    },
  }
);

const modal = new Modal(modalContainer, events);

const basket = new Basket(cloneTemplate<HTMLElement>(basketTemplate), events);
basket.render({
  items: [],
  total: 0,
});

const orderForm = new OrderForm(
  cloneTemplate<HTMLFormElement>(orderTemplate),
  events
);

const contactsForm = new ContactsForm(
  cloneTemplate<HTMLFormElement>(contactsTemplate),
  events
);

const success = new Success(cloneTemplate<HTMLElement>(successTemplate), {
  onClick: () => {
    modal.close();
  },
});


// Изменение каталога товаров
events.on('products:changed', () => {
  const products = productCatalog.getProducts();

  const cards = products.map((product) => {
    const cardElement = cloneTemplate<HTMLElement>(cardCatalogTemplate);

    const card = new CatalogCard(cardElement, {
      onClick: () => {
        productCatalog.setSelectedProduct(product);
      },
    });

    return card.render({
      ...product,
      image: CDN_URL + product.image,
    });
  });

  page.render({
    catalog: cards,
  });
});

events.on('product:selected', () => {
  const product = productCatalog.getSelectedProduct();

  if (!product) {
    return;
  }

  const isInBasket = basketModel.hasItem(product.id);

  previewCard.buttonText = isInBasket
    ? 'Удалить из корзины'
    : 'В корзину';

  modal.render({
    content: previewCard.render({
      ...product,
      image: CDN_URL + product.image,
    }),
  });
});

events.on('basket:changed', () => {
  header.render({
    counter: basketModel.getCount(),
  });

  const basketItems = basketModel.getItems().map((product, index) => {
    const cardElement = cloneTemplate<HTMLElement>(cardBasketTemplate);

    const card = new BasketCard(cardElement, {
      onClick: () => {
        basketModel.removeItem(product);
      },
    });

    card.index = index + 1;

    return card.render(product);
  });

  basket.render({
    items: basketItems,
    total: basketModel.getTotal(),
  });
});

events.on('basket:open', () => {
  modal.render({
    content: basket.render(),
  });
});

events.on('order:open', () => {
  modal.render({
    content: orderForm.render(),
  });
});

events.on('order.payment:change', (data: { value: TPayment }) => {
  buyerModel.setData({
    payment: data.value,
  });
});

events.on('order.address:change', (data: { value: string }) => {
  buyerModel.setData({
    address: data.value,
  });
});

events.on('buyer:changed', () => {
  const buyer = buyerModel.getData();
  const errors = buyerModel.validate();

  orderForm.render({
    payment: buyer.payment,
    address: buyer.address,
    valid: !errors.payment && !errors.address,
    errors: [errors.payment, errors.address].filter(Boolean).join('; '),
  });

  contactsForm.render({
    email: buyer.email,
    phone: buyer.phone,
    valid: !errors.email && !errors.phone,
    errors: [errors.email, errors.phone].filter(Boolean).join('; '),
  });
});

events.on('order:submit', () => {
  modal.render({
    content: contactsForm.render(),
  });
});

events.on('contacts.email:change', (data: { value: string }) => {
  buyerModel.setData({
    email: data.value,
  });
});

events.on('contacts.phone:change', (data: { value: string }) => {
  buyerModel.setData({
    phone: data.value,
  });
});

events.on('contacts:submit', () => {
  const buyer = buyerModel.getData();
  const items = basketModel.getItems().map((item) => item.id);
  const total = basketModel.getTotal();

  webLarekApi
    .createOrder({
      ...buyer,
      items,
      total,
    })
    .then((response) => {
      modal.render({
        content: success.render({
          total: response.total,
        }),
      });

      basketModel.clear();
      buyerModel.clear();
    })
    .catch((error) => {
      console.error('Ошибка оформления заказа:', error);
    });
});


// Загрузка товаров с сервера
webLarekApi.getProducts()
  .then((data) => {
    productCatalog.setProducts(data.items);
  })
  .catch((error) => {
    console.error('Ошибка получения товаров с сервера:', error);
  });