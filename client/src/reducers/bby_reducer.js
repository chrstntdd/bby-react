import {
  POST_UPC,
  FORMAT_TABLE,
  INCREMENT_PRODUCT_QUANTITY,
  GET_PRODUCTS_FROM_STORE,
  REMOVE_PRODUCT_FROM_TABLE,
  DECREMENT_PRODUCT_QUANTITY,
  PRINT_TABLE,
  SHOW_ACTIONS,
  HIDE_ACTIONS,
  CLEAR_TABLE,
  SYNCED_TABLE_TO_DB
} from '../actions/types';
const orderBy = require('lodash.orderby');

const INITIAL_STATE = {
  // FOR TESTING
  products: [
    {
      name: 'Apple - 9.7-Inch iPad Pro with WiFi - 32GB - Silver',
      sku: 4901909,
      upc: '888462761222',
      department: 'COMPUTERS',
      departmentId: 6,
      modelNumber: 'MLMP2LL/A',
      classId: 403,
      value: 474.99,
      totalValue: 474.99,
      quantity: 1
    },
    {
      name: 'Apple - Smart Keyboard for 9.7-inch iPad Pro - Gray',
      sku: 5041505,
      upc: '888462815611',
      department: 'COMPUTERS',
      departmentId: 6,
      modelNumber: 'MM2L2AM/A',
      classId: 492,
      value: 149.99,
      totalValue: 149.99,
      quantity: 1
    },
    {
      name: 'Apple - Apple Pencil for iPad Pro - White',
      sku: 4538802,
      upc: '888462313674',
      department: 'COMPUTERS',
      departmentId: 6,
      modelNumber: 'MK0C2AM/A',
      classId: 492,
      value: 99.99,
      totalValue: 200,
      quantity: 2
    },
    {
      name: 'Metra - Installation Kit for Select Honda Vehicles - Black',
      sku: 9797981,
      upc: '086429215126',
      department: 'MOBILE AUDIO',
      departmentId: 11,
      modelNumber: 'IBR-807HD',
      classId: 18,
      value: 16.99,
      totalValue: 34,
      quantity: 2
    },
    {
      name: 'PowerA - Spectra Controller for Xbox One - Black',
      sku: 8685189,
      upc: '617885008184',
      department: 'INTERACTIVE SOFTWARE',
      departmentId: 9,
      modelNumber: 'CPFA115536-03',
      classId: 99,
      value: 37.99,
      totalValue: 76,
      quantity: 2
    },
    {
      name: "Insignia™ - 6' DisplayPort-to-HDMI Cable - Black",
      sku: 6213011,
      upc: '600603166860',
      department: 'ACCESSORIES',
      departmentId: 12,
      modelNumber: 'NS-PD06502',
      classId: 86,
      value: 39.99,
      totalValue: 80,
      quantity: 2
    },
    {
      name: 'GoPro - Charger - Black',
      sku: 5580649,
      upc: '818279015058',
      department: 'PHOTO/COMMODITIES',
      departmentId: 5,
      modelNumber: 'AADBD-001',
      classId: 56,
      value: 49.99,
      totalValue: 100,
      quantity: 2
    },
    {
      name: 'Apple - USB Power Adapter - White',
      sku: 6653042,
      upc: '885909627301',
      department: 'DIGITAL COMMUNICATIO',
      departmentId: 3,
      modelNumber: 'MD810LL/A',
      classId: 544,
      value: 16.99,
      totalValue: 34,
      quantity: 2
    },
    {
      name: 'SCOSCHE - BTFreq™ Bluetooth FM Transmitter - Black',
      sku: 5577305,
      upc: '033991057494',
      department: 'DIGITAL COMMUNICATIO',
      departmentId: 3,
      modelNumber: 'BTFM2A',
      classId: 544,
      value: 39.99,
      totalValue: 80,
      quantity: 2
    },
    {
      name:
        'WD - My Passport Ultra Metal Edition 1TB External USB 3.0 Portable Hard Drive - Silver',
      sku: 8173008,
      upc: '718037826806',
      department: 'COMPUTERS',
      departmentId: 6,
      modelNumber: 'WDBTYH0010BSL-NESN',
      classId: 166,
      value: 44.99,
      totalValue: 90,
      quantity: 2
    }
  ],
  formatted: false,
  printing: false,
  timer: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_UPC:
      // ADD IN NEW PRODUCT AT THE TOP OF THE ARRAY
      return Object.assign({}, state, {
        ...state,
        products: [action.payload, ...state.products]
      });
    case INCREMENT_PRODUCT_QUANTITY:
      // INCREMENT QUANTITY AND CALCULATE NEW VALUE BASED ON UPDATED QTY
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                  totalValue: Math.round((product.quantity + 1) * product.value)
                }
              : product
        )
      };
    case DECREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? {
                  ...product,
                  quantity: product.quantity - 1,
                  totalValue: Math.round((product.quantity - 1) * product.value)
                }
              : product
        )
      };
    case REMOVE_PRODUCT_FROM_TABLE:
      return {
        ...state,
        products: state.products.filter(
          product => product.upc !== action.payload
        )
      };
    case FORMAT_TABLE:
      return {
        ...state,
        products: orderBy(
          state.products,
          ['departmentId', 'classId', 'sku'],
          ['asc', 'asc', 'asc']
        ),
        formatted: true
      };
    case SHOW_ACTIONS:
      return {
        ...state,
        printing: false
      };
    case HIDE_ACTIONS:
      return {
        ...state,
        printing: true
      };
    case CLEAR_TABLE:
      return {
        ...state,
        products: []
      };
    case SYNCED_TABLE_TO_DB:
      return { ...state };
    default:
      return state;
  }
}
