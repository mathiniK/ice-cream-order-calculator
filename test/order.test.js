const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const prices = require('../config/prices.json');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /api/orders/calculate', () => {
  it('should calculate the total price of the order', async () => {
    const order = {
      baseFlavor: 'Raspberry Slushy',
      scoops: 2,
      condiments: ['Sprinkles', 'Toasted Marshmallow', 'Dried Mango'],
      container: 'Waffle Cone'
    };

    const res = await chai.request(app)
      .post('/api/orders/calculate')
      .send(order);

    const expectedPrice = prices.baseFlavors['Raspberry Slushy']
      + 2 * prices.baseFlavors['Raspberry Slushy']
      + prices.condiments['Sprinkles']
      + prices.condiments['Toasted Marshmallow']
      + prices.condiments['Dried Fruit']['Dried Mango']
      + prices.containers['Waffle Cone'];

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('order');
    expect(res.body).to.have.property('price').that.equals(expectedPrice);
  });

  it('should return an error for an invalid base flavor', async () => {
    const order = {
      baseFlavor: 'Invalid Flavor',
      scoops: 2,
      condiments: ['Sprinkles', 'Toasted Marshmallow', 'Dried Mango'],
      container: 'Waffle Cone'
    };

    const res = await chai.request(app)
      .post('/api/orders/calculate')
      .send(order);

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message', 'Invalid base flavor');
  });

  it('should return an error for an invalid condiment', async () => {
    const order = {
      baseFlavor: 'Raspberry Slushy',
      scoops: 2,
      condiments: ['Sprinkles', 'Invalid Condiment'],
      container: 'Waffle Cone'
    };

    const res = await chai.request(app)
      .post('/api/orders/calculate')
      .send(order);

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message').that.includes('Invalid condiment');
  });

  it('should return an error for an invalid container', async () => {
    const order = {
      baseFlavor: 'Raspberry Slushy',
      scoops: 2,
      condiments: ['Sprinkles', 'Toasted Marshmallow'],
      container: 'Invalid Container'
    };

    const res = await chai.request(app)
      .post('/api/orders/calculate')
      .send(order);

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message', 'Invalid container');
  });
});
