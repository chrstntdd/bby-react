import * as axios from 'axios';
import axiosMock from 'axios';
import * as React from 'react';
import * as configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './';
import * as types from './types';

jest.useFakeTimers();

const MockAdapter = require('axios-mock-adapter');
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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

describe('auth actions', () => {
  describe('loginUser', () => {
    it('should dispatch LOGIN_REQUEST and LOGIN_SUCCESS', async () => {
      const mock = new MockAdapter(axios);
      const employeeNumber = 'a1075394';
      const password = 'dummy';

      mock
        .onPost(`${API_URL}/users/sign-in`, {
          email: `${employeeNumber.trim()}@bestbuy.com`,
          password
        })
        .reply(200, {
          jwt: 'stub',
          user: 'yeh'
        });

      const store = mockStore(initialState);
      await store.dispatch(actions.loginUser({ employeeNumber, password }));
      const response = store.getActions();

      expect(response.length).toEqual(2);
      expect(response).toEqual([
        { type: types.LOGIN_REQUEST },
        {
          type: types.LOGIN_SUCCESS,
          payload: {
            jwt: 'stub',
            user: 'yeh'
          }
        }
      ]);
    });
    it('should dispatch LOGIN_FAILURE if there was a problem', async done => {
      axiosMock.post = jest.fn();
      axiosMock.post.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              otherError: {}
            }
          }
        })
      );

      const employeeNumber = 'a1075394';
      const password = '<>';
      const store = mockStore(initialState);

      try {
        setImmediate(() => {
          store.dispatch(actions.loginUser({ employeeNumber, password }));
          const response = store.getActions();

          /* SINCE THIS CHAIN OF EVENTS HAS PROMISE BASED TIMEOUTS,
             WE RUN THE TIMERS OUT BY WRAPPING IN setImmediate.
             
             IT IS VERY IMPORTANT TO WRAP WITH A TRY CATCH. A FAILURE
             WITHOUT THIS SAFEGUARD WILL CRASH JEST COMPLETELY
          */
          expect(response.length).toEqual(3);
          expect(response).toEqual([
            { type: types.LOGIN_REQUEST },
            {
              type: types.LOGIN_FAILURE,
              payload: 'An unknown error occurred.'
            },
            { type: types.CLEAR_FLASH_MESSAGE }
          ]);
          expect(axiosMock.post).toHaveBeenCalledTimes(1);
          expect(axiosMock.post).toHaveBeenCalledWith(`${API_URL}/users/sign-in`, {
            email: `${employeeNumber.trim()}@bestbuy.com`,
            password
          });
        });
      } catch (error) {
        done.fail(error);
      }

      done();
    });
  });
  describe('registerUser', () => {
    it('should dispatch REGISTER_REQUEST and REGISTER_SUCCESS on valid credentials', async done => {
      axiosMock.post = jest.fn();
      axiosMock.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: []
        })
      );

      const mockEmployee = {
        firstName: 'Christian',
        lastName: 'Todd',
        password: 'dumbothicc',
        employeeNumber: 'a1',
        storeNumber: 420
      };

      const store = mockStore(initialState);

      try {
        setImmediate(() => {
          store.dispatch(actions.registerUser(mockEmployee));
          const response = store.getActions();

          expect(response.length).toEqual(3);
          expect(response).toEqual([
            { type: types.REGISTER_REQUEST },
            {
              type: types.REGISTER_SUCCESS,
              payload:
                'Registered successfully, please check your work email to verify your account'
            },
            { type: types.CLEAR_FLASH_MESSAGE }
          ]);
          expect(axiosMock.post).toHaveBeenCalledTimes(1);
          expect(axiosMock.post).toHaveBeenCalledWith(`${API_URL}/users`, mockEmployee);
        });
      } catch (error) {
        done.fail(error);
      }

      done();
    });
    it('should dispatch REGISTER_REQUEST and REGISTER_FAILURE on invalid credentials', async done => {
      axiosMock.post = jest.fn();
      axiosMock.post.mockImplementationOnce(() =>
        Promise.resolve({
          messages: [{ msg: 'an error' }]
        })
      );
      const mockEmployee = {
        firstName: 'Christian',
        lastName: 'Todd',
        password: '<>',
        employeeNumber: 'a1',
        storeNumber: 'what'
      };
      const store = mockStore(initialState);

      try {
        setImmediate(() => {
          store.dispatch(actions.registerUser(mockEmployee));
          const response = store.getActions();

          expect(response.length).toEqual(3);
          expect(response).toEqual([
            { type: types.REGISTER_REQUEST },
            {
              type: types.REGISTER_FAILURE,
              payload: 'an error'
            },
            { type: types.CLEAR_FLASH_MESSAGE }
          ]);
          expect(axiosMock.post).toHaveBeenCalledTimes(1);
          expect(axiosMock.post).toHaveBeenCalledWith(`${API_URL}/users`, mockEmployee);
        });
      } catch (error) {
        done.fail(error);
      }

      done();
    });
  });

  describe('getForgotPasswordToken', () => {
    it('should dispatch FORGOT_PASSWORD_REQUEST', async done => {
      axiosMock.post = jest.fn();
      axiosMock.post.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              message: 'as'
            }
          }
        })
      );

      const employeeNumber = 'a1';
      const store = mockStore(initialState);

      store.dispatch(actions.getForgotPasswordToken({ employeeNumber }));

      try {
        setImmediate(() => {
          const response = store.getActions();
          expect(response.length).toEqual(3);
          expect(response).toEqual([
            {
              type: types.FORGOT_PASSWORD_REQUEST
            },
            {
              type: types.FORGOT_PASSWORD_SUCCESS,
              payload: 'thanks'
            },
            {
              type: types.CLEAR_FLASH_MESSAGE
            }
          ]);
        });
      } catch (error) {
        done.fail(error);
      }

      expect(axiosMock.post).toHaveBeenCalledTimes(1);
      expect(axiosMock.post).toHaveBeenCalledWith(`${API_URL}/users/forgot-password`, {
        employeeNumber
      });
      done();
    });
  });

  describe('resetPassword', () => {
    it('should dispatch RESET_PASSWORD_REQUEST', done => {
      axiosMock.post = jest.fn();
      axiosMock.post.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              message: 'as'
            }
          }
        })
      );

      const store = mockStore(initialState);
      const password = 'fakeNews';
      const token = 'asdfjfks';

      store.dispatch(actions.resetPassword(token, { password }));

      try {
        setImmediate(() => {
          const response = store.getActions();

          expect(response.length).toEqual(3);
          expect(response).toEqual([
            {
              type: types.RESET_PASSWORD_REQUEST
            },
            {
              type: types.RESET_PASSWORD_SUCCESS,
              payload: 'your password has been changed'
            },
            {
              type: types.CLEAR_FLASH_MESSAGE
            }
          ]);
        });
      } catch (error) {
        done.fail(error);
      }

      expect(axiosMock.post).toHaveBeenCalledTimes(1);
      expect(axiosMock.post).toHaveBeenCalledWith(
        `${API_URL}/users/reset-password?token=${token}`,
        {
          password
        }
      );
      done();
    });
  });

  describe('confirmEmail', () => {
    it('should dispatch LOGIN_SUCCESS', done => {
      axiosMock.post = jest.fn();
      axiosMock.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            jwt: 'jwt token',
            user: 'user'
          }
        })
      );

      const store = mockStore(initialState);
      const token = 'asdfjfks';

      try {
        setImmediate(() => {
          store.dispatch(actions.confirmEmail(token));
          const response = store.getActions();

          expect(response.length).toEqual(1);
          expect(response).toEqual([
            {
              type: types.LOGIN_SUCCESS,
              payload: { user: 'user', jwt: 'jwt token' }
            }
          ]);
          expect(axiosMock.post).toHaveBeenCalledTimes(1);
          expect(axiosMock.post).toHaveBeenCalledWith(
            `${API_URL}/users/verify-email?token=${token}`
          );
        });
      } catch (error) {
        done.fail(error);
      }

      done();
    });
  });
});

describe('table actions', () => {
  describe('getProductDetails', () => {
    it('should get back a POST_UPC response from a valid post upc', done => {
      axiosMock.post = jest.fn();
      axiosMock.post.mockImplementationOnce(() => Promise.resolve(mockProduct));

      const store = mockStore(initialState);

      try {
        setImmediate(() => {
          store.dispatch(actions.getProductDetails({ upc: '027242900653' }));
          const expectedActions = store.getActions();

          expect(expectedActions.length).toEqual(1);
          expect(expectedActions).toContainEqual({
            type: types.POST_UPC,
            payload: mockProduct
          });
        });
      } catch (error) {
        done.fail(error);
      }

      done();
    });

    it('should get back an INVALID_UPC response from an invalid upc', done => {
      axiosMock.post = jest.fn();
      axiosMock.post.mockImplementationOnce(() => Promise.resolve(mockProduct));

      const store = mockStore(initialState);

      try {
        setImmediate(() => {
          store.dispatch(actions.getProductDetails({ upc: 'abc' }));
          const expectedActions = store.getActions();

          expect(expectedActions.length).toEqual(1);
          expect(expectedActions).toContainEqual({
            type: types.INVALID_UPC
          });
        });
      } catch (error) {
        done.fail(error);
      }
      done();
    });

    it("should dispatch an INCREMENT_PRODUCT_QUANTITY when the upc isn't unique to state.table.products", done => {
      const store = mockStore({
        auth: {
          jwt: 'stub'
        },
        table: {
          products: [mockProduct]
        }
      });

      try {
        setImmediate(() => {
          store.dispatch(actions.getProductDetails({ upc: '027242900653' }));
          const expectedActions = store.getActions();

          expect(expectedActions.length).toEqual(1);
          expect(expectedActions).toContainEqual({
            type: types.INCREMENT_PRODUCT_QUANTITY,
            payload: '027242900653'
          });
        });
      } catch (error) {
        done.fail(error);
      }
      done();
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

  describe('syncToDatabase', () => {
    it('should dispatch SYNC_TABLE_SUCCESS', async () => {
      const mock = new MockAdapter(axios);
      const store = mockStore(initialState);
      const response = store.getActions();
      const state = store.getState();
      const userId = state.auth.userProfile.id;
      const products = state.table.products;

      mock
        .onPut(`${API_URL}/users/${userId}/table`, {
          currentTableState: products
        })
        .reply(201);

      await store.dispatch(actions.syncToDatabase());

      expect(response.length).toEqual(2);
      expect(response).toEqual([
        {
          type: types.SYNC_TABLE_REQUEST
        },
        {
          type: types.SYNC_TABLE_SUCCESS,
          payload: new Date().toLocaleTimeString()
        }
      ]);
    });
  });

  describe('loadTable', () => {
    it('should dispatch LOAD_SAVED_TABLE', async () => {
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
      const user = state.auth.userProfile;

      mock.onGet(`${API_URL}/users/${user.id}/table`).reply(200, { products: mockProductsArr });

      await store.dispatch(actions.loadTable(user, 'JWT asdfasdf'));
      const response = store.getActions();

      expect(response.length).toEqual(1);
      expect(response).toContainEqual({
        type: types.LOAD_SAVED_TABLE,
        payload: mockProductsArr
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
