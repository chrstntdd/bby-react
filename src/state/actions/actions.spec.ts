import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './';
import * as types from './types';

jest.useFakeTimers();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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
    isAuthenticated: true
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

describe('table actions', () => {
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
    it('hideActions should dispatch HIDE_ACTIONS', done => {
      const store = mockStore(initialState);

      try {
        setImmediate(() => {
          const response = store.getActions();
          store.dispatch(actions.hideActions());

          expect(response.length).toEqual(1);
          expect(response).toEqual({
            type: types.HIDE_ACTIONS
          });
        });
      } catch (error) {
        done.fail(error);
      }
      done();
    });
    it('showActions should dispatch SHOW_ACTIONS', done => {
      const store = mockStore(initialState);

      try {
        setImmediate(() => {
          const response = store.getActions();

          jest.runAllTicks();

          store.dispatch(actions.showActions());
          expect(response.length).toEqual(1);

          expect(response).toContainEqual({
            type: types.SHOW_ACTIONS
          });
        });
      } catch (error) {
        done.fail(error);
      }
      done();
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
