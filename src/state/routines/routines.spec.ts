import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as routines from './';
import * as types from '../actions/types';

import FetchMock from '@/fetch';

jest.mock('@/fetch', () => jest.fn());
jest.mock('@/util', () => ({
  timeout: jest.fn()
}));

jest.useFakeTimers();

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
    showModal: false
  }
};

describe('getProductDetails', () => {
  const store = mockStore(initialState);
  afterEach(() => {
    store.clearActions();
    FetchMock.mockClear();
  });

  describe('when the UPC **DOES NOT** exist in state', () => {
    it('should dispatch a message with the product details as data', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve(mockProduct);
          }
        })
      );

      try {
        await store.dispatch(routines.getProductDetails({ upc: '1' }));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions.length).toBe(1);
        expect(expectedActions).toContainEqual({
          type: types.POST_UPC,
          payload: mockProduct
        });
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });

  describe('when the UPC exists within the current table state', () => {
    it('should dispatch a message to increment the quantity of the product', async done => {
      const store = mockStore(initialState);

      try {
        await store.dispatch(
          routines.getProductDetails({ upc: initialState.table.products[0].upc })
        );

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(0);

        expect(expectedActions.length).toBe(1);
        expect(expectedActions).toContainEqual({
          type: types.INCREMENT_PRODUCT_QUANTITY,
          payload: initialState.table.products[0].upc
        });
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });
});

describe('loginUser', () => {
  const store = mockStore(initialState);
  const mockUser = { id: 'me' };
  const mockJWT = 'test';
  const mockErrorMsg = 'there was an error';

  afterEach(() => {
    store.clearActions();
    FetchMock.mockReset();
  });

  describe('a successful login attempt', () => {
    it('should log the user in and load a table', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve({ user: mockUser, jwt: mockJWT });
          }
        })
      );
      /* MOCKING THE LOAD TABLE CALL */
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve({ user: mockUser, jwt: mockJWT });
          }
        })
      );

      try {
        await store.dispatch(routines.loginUser('a1', 'password'));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(2);

        expect(expectedActions).toEqual([
          { type: types.LOGIN_REQUEST },
          { type: types.CLEAR_FLASH_MESSAGE },
          {
            type: types.LOGIN_SUCCESS,
            payload: {
              user: mockUser,
              jwt: mockJWT
            }
          },
          { type: types.CLEAR_FLASH_MESSAGE },
          { payload: undefined, type: types.LOAD_SAVED_TABLE }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });

  describe('a failed login attempt', () => {
    it('should dispatch a an error message', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          statusText: 'test',
          json() {
            return Promise.resolve({ message: mockErrorMsg });
          }
        })
      );

      try {
        await store.dispatch(routines.loginUser('a1', 'password'));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.LOGIN_REQUEST },
          { type: types.CLEAR_FLASH_MESSAGE },
          {
            type: types.LOGIN_FAILURE,
            payload: mockErrorMsg
          },
          { type: types.CLEAR_FLASH_MESSAGE }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });
});

describe('registerUser', () => {
  const store = mockStore(initialState);
  const mockErrorMsg = 'there was an error';
  const mockRegisterAccountObj = {
    firstName: 'Christian',
    lastName: 'Todd',
    password: 'secure',
    employeeNumber: 'a1',
    storeNumber: 420
  };

  afterEach(() => {
    store.clearActions();
    FetchMock.mockClear();
  });

  describe('a successful register attempt', () => {
    it('should go off without a hitch!', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve('thing');
          }
        })
      );

      try {
        await store.dispatch(routines.registerUser(mockRegisterAccountObj));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.REGISTER_REQUEST },
          {
            type: types.REGISTER_SUCCESS,
            payload: 'Registered successfully, please check your work email to verify your account'
          },
          { type: types.CLEAR_FLASH_MESSAGE }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });

  describe('a failed register attempt', () => {
    it('should dispatch an error message', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          statusText: 'test',
          json() {
            return Promise.resolve({ message: mockErrorMsg });
          }
        })
      );

      try {
        await store.dispatch(routines.registerUser(mockRegisterAccountObj));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.REGISTER_REQUEST },
          {
            type: types.REGISTER_FAILURE,
            payload: mockErrorMsg
          },
          { type: types.CLEAR_FLASH_MESSAGE }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });
});

describe('getForgotPasswordToken', () => {
  const store = mockStore(initialState);
  const mockMsg = 'success!';
  const mockEmployeeNumber = 'a1075394';
  const mockErrorMsg = 'there was an error';

  afterEach(() => {
    store.clearActions();
    FetchMock.mockClear();
  });

  describe('the success case', () => {
    it('should work', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve({ message: mockMsg });
          }
        })
      );

      try {
        await store.dispatch(routines.getForgotPasswordToken(mockEmployeeNumber));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.FORGOT_PASSWORD_REQUEST },
          {
            type: types.FORGOT_PASSWORD_SUCCESS,
            payload: mockMsg
          },
          { type: types.CLEAR_FLASH_MESSAGE }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });

  describe('the failure case', () => {
    it('should dispatch an error message', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          statusText: 'test',
          json() {
            return Promise.resolve({ message: mockErrorMsg });
          }
        })
      );

      try {
        await store.dispatch(routines.getForgotPasswordToken(mockEmployeeNumber));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.FORGOT_PASSWORD_REQUEST },
          {
            type: types.FORGOT_PASSWORD_FAILURE,
            payload: mockErrorMsg
          },
          { type: types.CLEAR_FLASH_MESSAGE }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });
});

describe('resetPassword', () => {
  const store = mockStore(initialState);
  const mockResetToken = 'JFmdGbgg5cWT8CbUjsSVuwpHtKCZNKJV';
  const mockNewPassword = 'secure';
  const mockMsg = 'success!';
  const mockErrorMsg = 'there was an error';

  afterEach(() => {
    store.clearActions();
    FetchMock.mockClear();
  });
  describe('the success case', () => {
    it('should work', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve({ message: mockMsg });
          }
        })
      );

      try {
        await store.dispatch(routines.resetPassword(mockResetToken, mockNewPassword));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.RESET_PASSWORD_REQUEST },
          {
            type: types.RESET_PASSWORD_SUCCESS,
            payload: mockMsg
          },
          { type: types.CLEAR_FLASH_MESSAGE }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });

  describe('the failure case', () => {
    it('should dispatch an error message', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          statusText: 'test',
          json() {
            return Promise.resolve({ message: mockErrorMsg });
          }
        })
      );

      try {
        await store.dispatch(routines.resetPassword(mockResetToken, mockNewPassword));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.RESET_PASSWORD_REQUEST },
          {
            type: types.RESET_PASSWORD_FAILURE,
            payload: mockErrorMsg
          },
          { type: types.CLEAR_FLASH_MESSAGE }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });
});

describe('confirmEmail', () => {
  const store = mockStore(initialState);
  const mockConfirmationToken = 'zNwLv7KcC6ffVnYWCsdAdEYJsE7WpTvJ';
  const mockUser = 'me';
  const mockJWT = 'test';

  afterEach(() => {
    store.clearActions();
    FetchMock.mockClear();
  });

  describe('the success case', () => {
    it('should dispatch a message to log the user in', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve({
              user: mockUser,
              jwt: mockJWT
            });
          }
        })
      );

      try {
        await store.dispatch(routines.confirmEmail(mockConfirmationToken));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          {
            type: types.LOGIN_SUCCESS,
            payload: {
              user: mockUser,
              jwt: mockJWT
            }
          }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });
});

describe('syncToDatabase', () => {
  const store = mockStore(initialState);
  const mockErrorMessage = 'error';

  afterEach(() => {
    store.clearActions();
    FetchMock.mockReset();
  });

  describe('when there are products to be saved', () => {
    it('should call the API', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'error ',
          json() {
            return Promise.resolve();
          }
        })
      );

      try {
        await store.dispatch(routines.syncToDatabase());

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.SYNC_TABLE_REQUEST },
          { type: types.SYNC_TABLE_SUCCESS, payload: expect.any(String) } // timestamp
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });

  describe('when there are not any products to be saved', () => {
    it('should **NOT** call the API', async done => {
      const store = mockStore({
        ...initialState,
        table: {
          products: []
        }
      });
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve();
          }
        })
      );

      try {
        await store.dispatch(routines.syncToDatabase());

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(0);

        expect(expectedActions).toEqual([
          { type: types.SYNC_TABLE_REQUEST },
          { type: types.SYNC_TABLE_FAILURE, payload: expect.any(String) } // error message
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });

  describe('when there is an error', () => {
    it('should dispatch an error message', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          statusText: 'KABOOM',
          json() {
            return Promise.resolve({ message: mockErrorMessage });
          }
        })
      );

      try {
        await store.dispatch(routines.syncToDatabase());

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.SYNC_TABLE_REQUEST },
          { type: types.SYNC_TABLE_FAILURE, payload: mockErrorMessage }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });
});

describe('loadTable', () => {
  const store = mockStore(initialState);
  const mockErrorMessage = 'error';
  const mockUserId = 'a1';
  const mockJWT = 'token';

  afterEach(() => {
    store.clearActions();
    FetchMock.mockReset();
  });
  describe('success case', () => {
    it('should work', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          statusText: 'test',
          json() {
            return Promise.resolve({ products: ['product1'] });
          }
        })
      );

      try {
        await store.dispatch(routines.loadTable(mockUserId, mockJWT));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.LOAD_SAVED_TABLE, payload: expect.any(Array) }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });

  describe('failure case', () => {
    it('should handle the error', async done => {
      FetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          statusText: 'test',
          json() {
            return Promise.resolve({ message: mockErrorMessage });
          }
        })
      );

      try {
        await store.dispatch(routines.loadTable(mockUserId, mockJWT));

        const expectedActions = store.getActions();

        expect(FetchMock).toHaveBeenCalledTimes(1);

        expect(expectedActions).toEqual([
          { type: types.LOAD_SAVED_TABLE_FAILURE, payload: mockErrorMessage }
        ]);
      } catch (error) {
        done.fail(error);
      }
      done();
    });
  });
});
