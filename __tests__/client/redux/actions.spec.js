import 'babel-polyfill';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../client/src/actions/index';
import * as types from '../../../client/src/actions/types';
const MockAdapter = require('axios-mock-adapter');
import * as axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockProduct = {
  name: 'Sony - AS410AP Sport In-Ear Headphones - Gray',
  sku: 5581246,
  upc: '027242900653',
  department: 'AUDIO',
  departmentId: 1,
  modelNumber: 'MDRAS410AP/B',
  classId: 16,
  value: 23.99,
  totalValue: 23.99,
  quantity: 1
};

const initialState = {
  auth: {
    userProfile: {
      id: '599da3d20e07e617f988d706',
      email: 'a1075394@bestbuy.com',
      firstName: 'Christian',
      lastName: 'Todd',
      role: 'Member',
      isVerified: true,
      tables: ['599da4290e07e617f988d707']
    },
    jwt:
      'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5OWRhM2QyMGUwN2U2MTdmOTg4ZDcwNiIsImVtYWlsIjoiYTEwNzUzOTRAYmVzdGJ1eS5jb20iLCJmaXJzdE5hbWUiOiJDaHJpc3RpYW4iLCJsYXN0TmFtZSI6IlRvZGQiLCJyb2xlIjoiTWVtYmVyIiwiaXNWZXJpZmllZCI6dHJ1ZSwidGFibGVzIjpbIjU5OWRhNDI5MGUwN2U2MTdmOTg4ZDcwNyJdLCJpYXQiOjE1MDM1MTU2MTgsImV4cCI6MTUwMzUyMjgxOH0.cwbw8CIHuQmo5GLGCnFyfMc1Gk0YNY_CM8ux3vNfr20',
    error: '',
    message: '',
    content: '',
    authenticated: true
  },
  form: {
    postUPC: {
      fields: {
        upc: {
          touched: true,
          visited: true
        }
      },
      anyTouched: true
    }
  },
  table: {
    products: [
      {
        name:
          'myCharge - Adventure Plus 6,700 mAh Portable Charger for Most USB-Enabled Devices - Orange/black',
        sku: 5781143,
        upc: '847843005010',
        department: 'DIGITAL COMMUNICATIO',
        departmentId: 3,
        modelNumber: 'AVC67E',
        classId: 544,
        value: 29.99,
        totalValue: 150,
        quantity: 5
      }
    ],
    formatted: false,
    printing: false,
    tableId: '599da4290e07e617f988d707',
    showModal: false,
    selectOptionData: [
      {
        tableId: '599da4290e07e617f988d707',
        formattedDate: 'Wed Aug 23 2017-11:50:01 AM'
      }
    ]
  }
};

const API_URL = 'http://localhost:3000/api/v1';

describe('auth actions', () => {
  describe('', () => {
    it('', () => {
      /*  */
    });
  });
});

describe('table actions', () => {
  describe('getProductDetails', () => {
    it('should get back a POST_UPC response from a valid post upc', () => {
      const mock = new MockAdapter(axios);

      mock
        .onPost(`${API_URL}/best-buy/upc`, { upc: '027242900653' })
        .reply(200, mockProduct);
      const store = mockStore(initialState);
      return store
        .dispatch(actions.getProductDetails({ upc: '027242900653' }))
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toEqual(1);
          expect(expectedActions).toContainEqual({
            type: types.POST_UPC,
            payload: mockProduct
          });
        });
    });
    it('should get back an INVALID_UPC response from an invalid upc', () => {
      const mock = new MockAdapter(axios);

      mock
        .onPost(`${API_URL}/best-buy/upc`, { upc: '027242900653' })
        .reply(400, {
          message: 'UPC not recognized. Please try your search again'
        });
      const store = mockStore(initialState);
      return store
        .dispatch(actions.getProductDetails({ upc: 'abc' }))
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toEqual(1);
          expect(expectedActions).toContainEqual({
            type: types.INVALID_UPC
          });
        });
    });

    it("should dispatch an INCREMENT_PRODUCT_QUANTITY when the upc isn't unique to state.table.products", async () => {
      const store = mockStore({
        auth: {
          jwt: 'stub'
        },
        table: {
          products: [mockProduct]
        }
      });

      await store.dispatch(actions.getProductDetails({ upc: '027242900653' }));

      const expectedActions = store.getActions();
      expect(expectedActions.length).toEqual(1);
      expect(expectedActions).toContainEqual({
        type: types.INCREMENT_PRODUCT_QUANTITY,
        payload: '027242900653'
      });
    });
  });
  describe('decrementProductQuantity ', () => {
    it('should dispatch DECREMENT_PRODUCT_QUANTITY', () => {
      const store = mockStore(initialState);

      store.dispatch(actions.decrementProductQuantity({ upc: '027242900653' }));

      const response = store.getActions();

      expect(response.length).toEqual(1);
      expect(response).toContainEqual({
        type: types.DECREMENT_PRODUCT_QUANTITY,
        payload: { upc: '027242900653' }
      });
    });
  });
  describe('removeItemFromTable', () => {
    it('should dispatch REMOVE_PRODUCT_FROM_TABLE', () => {
      const store = mockStore(initialState);
      const response = store.getActions();

      store.dispatch(actions.removeItemFromTable({ upc: '027242900653' }));
      expect(response.length).toEqual(1);
      expect(response).toContainEqual({
        type: types.REMOVE_PRODUCT_FROM_TABLE,
        payload: { upc: '027242900653' }
      });
    });
  });
  describe('formatTable', () => {
    it('should dispatch FORMAT_TABLE', () => {
      const store = mockStore(initialState);
      const response = store.getActions();

      store.dispatch(actions.formatTable());
      expect(response.length).toEqual(1);
      expect(response).toContainEqual({
        type: types.FORMAT_TABLE
      });
    });
  });

  describe('printTable', () => {
    it('hideActions should dispatch HIDE_ACTIONS', async () => {
      const store = mockStore(initialState);
      const response = store.getActions();

      await store.dispatch(actions.hideActions());
      expect(response.length).toEqual(1);
      expect(response).toContainEqual({
        type: types.HIDE_ACTIONS
      });
    });
    it('showActions should dispatch SHOW_ACTIONS', async () => {
      const store = mockStore(initialState);
      const response = store.getActions();

      await store.dispatch(actions.showActions());
      expect(response.length).toEqual(1);
      expect(response).toContainEqual({
        type: types.SHOW_ACTIONS
      });
    });
  });

  describe('clearTable', () => {
    it('should dispatch CLEAR_TABLE', () => {
      const store = mockStore(initialState);
      const response = store.getActions();

      store.dispatch(actions.clearTable());
      expect(response.length).toEqual(1);
      expect(response).toContainEqual({
        type: types.CLEAR_TABLE
      });
    });
  });

  describe('syncToDatabase', () => {
    it('should dispatch SYNCED_TABLE_TO_DB', async () => {
      const mock = new MockAdapter(axios);
      const store = mockStore(initialState);
      const response = store.getActions();
      const state = store.getState();
      const userId = state.auth.userProfile.id;
      const products = state.table.products;
      const tableId = state.table.tableId;

      mock
        .onPut(`${API_URL}/tables/${userId}/${tableId}`, {
          products: products
        })
        .reply(201);

      await store.dispatch(actions.syncToDatabase());

      expect(response.length).toEqual(1);
      expect(response).toContainEqual({
        type: types.SYNCED_TABLE_TO_DB
      });
    });
  });

  describe('createNewTable', () => {
    it('should dispatch SET_NEW_TABLE_ID, LOAD_BLANK_TABLE, and TOGGLE_LOAD_TABLE_MODAL', async () => {
      const mock = new MockAdapter(axios);
      const store = mockStore(initialState);
      const state = store.getState();
      const userId = state.auth.userProfile.id;

      mock.onPost(`${API_URL}/tables/${userId}`).reply(200, { _id: '1234' });

      await store.dispatch(actions.createNewTable());

      const response = store.getActions();
      expect(response.length).toEqual(3);
      expect(response).toEqual([
        { type: types.SET_NEW_TABLE_ID, payload: '1234' },
        { type: types.LOAD_BLANK_TABLE },
        { type: types.TOGGLE_LOAD_TABLE_MODAL }
      ]);
    });
  });

  describe('getPreviousTableData', () => {
    it('should dispatch GET_USER_TABLE_SUCCESS', async () => {
      const mock = new MockAdapter(axios);
      const store = mockStore(initialState);
      const state = store.getState();
      const userId = state.auth.userProfile.id;
      const mockTableData = [
        {
          tableId: '599da4290e07e617f988d707',
          formattedDate: 'Wed Aug 23 2017-11:50:01 AM'
        }
      ];

      mock.onGet(`${API_URL}/tables/${userId}`).reply(200, mockTableData);

      await store.dispatch(actions.getPreviousTableData());
      const response = store.getActions();

      /* stubbing out proper response due to parsing errors */
      expect(response.length).toEqual(1);
      expect(response).toEqual([
        {
          type: 'GET_USER_TABLE_DATA_SUCCESS',
          payload: [{ formattedDate: 'Invalid Date-Invalid Date' }]
        }
      ]);
    });
  });

  describe('loadTable', () => {
    it('should dispatch LOAD_SAVED_TABLE, SET_NEW_TABLE_ID, and TOGGLE_LOAD_TABLE_MODAL', async () => {
      const mock = new MockAdapter(axios);
      const store = mockStore(initialState);
      const mockProductsArr = [
        {
          quantity: 5,
          totalValue: 150,
          value: 29.99,
          classId: 544,
          modelNumber: 'AVC67E',
          departmentId: 3,
          department: 'DIGITAL COMMUNICATIO',
          upc: '847843005010',
          sku: 5781143,
          name:
            'myCharge - Adventure Plus 6,700 mAh Portable Charger for Most USB-Enabled Devices - Orange/black',
          _id: '599ddccffbc4e92f544f2c23'
        },
        {
          _id: '599da8629ea2ca198e3f33ea',
          name: 'Sony - AS410AP Sport In-Ear Headphones - Gray',
          sku: 5581246,
          upc: '027242900653',
          department: 'AUDIO',
          departmentId: 1,
          modelNumber: 'MDRAS410AP/B',
          classId: 16,
          value: 23.99,
          totalValue: 240,
          quantity: 10
        }
      ];
      const state = store.getState();
      const userId = state.auth.userProfile.id;
      const tableId = '599da4290e07e617f988d707';
      const mockTableData = [
        {
          tableId: '599da4290e07e617f988d707',
          formattedDate: 'Wed Aug 23 2017-11:50:01 AM'
        }
      ];

      mock
        .onGet(`${API_URL}/tables/${userId}/${tableId}`)
        .reply(200, { products: mockProductsArr });

      await store.dispatch(actions.loadTable(tableId));
      const response = store.getActions();

      expect(response.length).toEqual(3);
      expect(response).toContainEqual(
        {
          type: types.LOAD_SAVED_TABLE,
          payload: mockProductsArr
        },
        { type: types.SET_NEW_TABLE_ID, payload: tableId },
        { type: types.TOGGLE_LOAD_TABLE_MODAL }
      );
    });
  });
  describe('toggleShowTableModal', () => {
    it('should dispatch TOGGLE_LOAD_TABLE_DATA', () => {
      const store = mockStore(initialState);

      store.dispatch(actions.toggleShowTableModal());

      const response = store.getActions();
      expect(response.length).toEqual(1);
      expect(response).toContainEqual({ type: types.TOGGLE_LOAD_TABLE_MODAL });
    });
  });
});
