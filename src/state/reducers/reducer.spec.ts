import auth_reducer from './auth-reducer';
import bby_reducer from './bby-reducer';
import * as types from '../actions/types';

const AUTH_INITIAL_STATE = {
  userProfile: null,
  jwt: null,
  error: '',
  message: '',
  content: '',
   isAuthenticated: false,
  waiting: false
};

const BBY_INITIAL_STATE = {
  products: [],
  formatted: false,
  printing: false,
  tableId: '',
  showModal: false,
  selectOptionData: null,
  lastTimeSaved: '',
  lastItemScanned: ''
};

const mockOptionData = [
  {
    tableId: '599da4290e07e617f988d707',
    formattedDate: 'Wed Aug 23 2017-11:50:01 AM'
  },
  {
    tableId: '599e2b420e338b56eed5e070',
    formattedDate: 'Wed Aug 23 2017-9:26:26 PM'
  },
  {
    tableId: '599e2b450e338b56eed5e071',
    formattedDate: 'Wed Aug 23 2017-9:26:29 PM'
  },
  {
    tableId: '599e2b470e338b56eed5e072',
    formattedDate: 'Wed Aug 23 2017-9:26:31 PM'
  }
];

const mockProduct = {
  name:
    'myCharge - Adventure Plus 6,700 mAh Portable Charger for Most USB-Enabled Devices - Orange/black',
  sku: 5781143,
  upc: '847843005010',
  department: 'DIGITAL COMMUNICATIO',
  departmentId: 3,
  modelNumber: 'AVC67E',
  classId: 544,
  value: 29.99,
  totalValue: 29.99,
  quantity: 2
};

const prodArr = [
  {
    _id: '599ddccffbc4e92f544f2c23',
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
  },
  {
    quantity: 10,
    totalValue: 240,
    value: 23.99,
    classId: 16,
    modelNumber: 'MDRAS410AP/B',
    departmentId: 1,
    department: 'AUDIO',
    upc: '027242900653',
    sku: 5581246,
    name: 'Sony - AS410AP Sport In-Ear Headphones - Gray',
    _id: '599da8629ea2ca198e3f33ea'
  }
];

describe('auth reducer', () => {
  it('should return the initial state if not passed in', () => {
    expect(auth_reducer(undefined, {})).toEqual(AUTH_INITIAL_STATE);
  });
  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth_reducer([], {
        type: types.LOGIN_SUCCESS,
        payload: {
          user: 'mock user',
          jwt: 'mock jwt'
        }
      })
    ).toEqual({
      userProfile: 'mock user',
      jwt: 'mock jwt',
      error: '',
      message: '',
      content: '',
       isAuthenticated: true,
      waiting: false
    });
  });
  it('should handle UNAUTH_USER', () => {
    expect(
      auth_reducer(
        {
          userProfile: 'mock user',
          jwt: 'mock jwt',
          error: '',
          message: '',
          content: '',
           isAuthenticated: true
        },
        {
          type: types.UNAUTH_USER
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: '',
      content: '',
       isAuthenticated: false
    });
  });
  it('should handle NOT_VERIFIED_LOGIN_ERROR', () => {
    const errorMessage = "YOU'RE NOT LOGGED IN";
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
           isAuthenticated: false
        },
        {
          type: types.NOT_VERIFIED_LOGIN_ERROR,
          payload: errorMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: errorMessage,
      message: '',
      content: '',
       isAuthenticated: false,
      waiting: false
    });
  });
  it('should handle LOGIN_FAILURE', () => {
    const errorMessage = 'THERE WAS A LOGIN FAILURE';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
           isAuthenticated: false
        },
        {
          type: types.LOGIN_FAILURE,
          payload: errorMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: errorMessage,
      message: '',
      content: '',
       isAuthenticated: false,
      waiting: false
    });
  });
  it('should handle CLEAR_FLASH_MESSAGE', () => {
    const errorMessage = 'THERE WAS A LOGIN FAILURE';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: errorMessage,
          message: '',
          content: '',
           isAuthenticated: false
        },
        {
          type: types.CLEAR_FLASH_MESSAGE
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: '',
      content: '',
       isAuthenticated: false,
      waiting: false
    });
  });
  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
           isAuthenticated: false,
          waiting: false
        },
        {
          type: types.FORGOT_PASSWORD_REQUEST
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: '',
      content: '',
       isAuthenticated: false,
      waiting: true
    });
  });
  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
           isAuthenticated: false,
          waiting: false
        },
        {
          type: types.RESET_PASSWORD_REQUEST
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: '',
      content: '',
       isAuthenticated: false,
      waiting: true
    });
  });
  it('should handle REGISTER_SUCCESS', () => {
    const responseMessage = 'YOU REGISTERED SUCCESSFULLY';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
           isAuthenticated: false
        },
        {
          type: types.REGISTER_SUCCESS,
          payload: responseMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: responseMessage,
      content: '',
       isAuthenticated: false,
      waiting: false
    });
  });
  it('should handle REGISTER_FAILURE', () => {
    const errorMessage = 'THERE WAS A REGISTRATION ERROR';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
           isAuthenticated: false,
          waiting: true
        },
        {
          type: types.REGISTER_FAILURE,
          payload: errorMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: errorMessage,
      message: '',
      content: '',
       isAuthenticated: false,
      waiting: false
    });
  });
});

describe('bby reducer', () => {
  it('should return the initial state if not passed in', () => {
    expect(bby_reducer(undefined, {})).toEqual(BBY_INITIAL_STATE);
  });
  it('should handle POST_UPC', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null,
          lastTimeSaved: null,
          lastItemScanned: ''
        },
        {
          type: types.POST_UPC,
          payload: mockProduct
        }
      )
    ).toEqual({
      products: [mockProduct],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null,
      lastTimeSaved: null,
      lastItemScanned: '847843005010'
    });
  });
  it('should handle INCREMENT_PRODUCT_QUANTITY', () => {
    expect(
      bby_reducer(
        {
          products: [mockProduct],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null,
          lastTimeSaved: null,
          lastItemScanned: '847843005010'
        },
        {
          type: types.INCREMENT_PRODUCT_QUANTITY,
          payload: mockProduct.upc
        }
      )
    ).toEqual({
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
          totalValue: 90,
          quantity: 3
        }
      ],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null,
      lastTimeSaved: null,
      lastItemScanned: '847843005010'
    });
  });

  it('should handle DECREMENT_PRODUCT_QUANTITY', () => {
    expect(
      bby_reducer(
        {
          products: [mockProduct],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.DECREMENT_PRODUCT_QUANTITY,
          payload: mockProduct.upc
        }
      )
    ).toEqual({
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
          totalValue: 30,
          quantity: 1
        }
      ],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });

  it('should handle REMOVE_PRODUCT_FROM_TABLE', () => {
    expect(
      bby_reducer(
        {
          products: [mockProduct],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.REMOVE_PRODUCT_FROM_TABLE,
          payload: mockProduct.upc
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });

  it('should handle FORMAT_TABLE', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.FORMAT_TABLE
        }
      )
    ).toEqual({
      products: [],
      formatted: true,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });

  it('should handle FORMAT_TABLE', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.FORMAT_TABLE
        }
      )
    ).toEqual({
      products: [],
      formatted: true,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });

  it('should handle HIDE_ACTIONS', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.HIDE_ACTIONS
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: true,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });
  it('should handle SHOW_ACTIONS', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: true,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.SHOW_ACTIONS
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });
  it('should handle CLEAR_TABLE', () => {
    expect(
      bby_reducer(
        {
          products: prodArr,
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.CLEAR_TABLE
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });
  it('should handle SYNC_TABLE_SUCCESS', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null,
          lastTimeSaved: null
        },
        {
          type: types.SYNC_TABLE_SUCCESS,
          payload: 'now'
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null,
      lastTimeSaved: 'now'
    });
  });

  it('should handle LOAD_SAVED_TABLE', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.LOAD_SAVED_TABLE,
          payload: prodArr
        }
      )
    ).toEqual({
      products: prodArr,
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });
  it('should handle TOGGLE_LOAD_TABLE_MODAL', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.TOGGLE_LOAD_TABLE_MODAL,
          payload: prodArr
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: true,
      selectOptionData: null
    });

    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: true,
          selectOptionData: null
        },
        {
          type: types.TOGGLE_LOAD_TABLE_MODAL,
          payload: prodArr
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });
  it('should handle GET_USER_TABLE_DATA_SUCCESS', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.GET_USER_TABLE_DATA_SUCCESS,
          payload: mockOptionData
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: mockOptionData
    });
  });
  it('should handle UNAUTH_USER', () => {
    expect(
      bby_reducer(
        {
          products: [],
          formatted: false,
          printing: false,
          tableId: '',
          showModal: false,
          selectOptionData: null
        },
        {
          type: types.UNAUTH_USER
        }
      )
    ).toEqual({
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: null
    });
  });
});

/* do you think we connected the entire world before 
we could all accept eachothers differences */
