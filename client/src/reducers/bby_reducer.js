import {
  POST_UPC,
  FORMAT_TABLE,
  INCREMENT_PRODUCT_QUANTITY,
  GET_PRODUCTS_FROM_STORE,
  REMOVE_PRODUCT_FROM_TABLE,
  DECREMENT_PRODUCT_QUANTITY
} from '../actions/types';
const orderBy = require('lodash.orderby');

const INITIAL_STATE = {
  // FOR TESTING
  products: [
    {
      name:
        'WD - My Passport Ultra Metal Edition 1TB External USB 3.0 Portable Hard Drive - Silver',
      sku: 8173008,
      upc: '718037826806',
      department: 'COMPUTERS',
      departmentId: 6,
      modelNumber: 'WDBTYH0010BSL-NESN',
      classId: 166,
      quantity: 1
    },
    {
      name: 'SCOSCHE - BTFreq™ Bluetooth FM Transmitter - Black',
      sku: 5577305,
      upc: '033991057494',
      department: 'DIGITAL COMMUNICATIO',
      departmentId: 3,
      modelNumber: 'BTFM2A',
      classId: 544,
      quantity: 1
    },
    {
      name: 'Apple - USB Power Adapter - White',
      sku: 6653042,
      upc: '885909627301',
      department: 'DIGITAL COMMUNICATIO',
      departmentId: 3,
      modelNumber: 'MD810LL/A',
      classId: 544,
      quantity: 1
    },
    {
      name: 'GoPro - Charger - Black',
      sku: 5580649,
      upc: '818279015058',
      department: 'PHOTO/COMMODITIES',
      departmentId: 5,
      modelNumber: 'AADBD-001',
      classId: 56,
      quantity: 1
    },
    {
      name: "Insignia™ - 6' DisplayPort-to-HDMI Cable - Black",
      sku: 6213011,
      upc: '600603166860',
      department: 'ACCESSORIES',
      departmentId: 12,
      modelNumber: 'NS-PD06502',
      classId: 86,
      quantity: 1
    },
    {
      name: 'PowerA - Spectra Controller for Xbox One - Black',
      sku: 8685189,
      upc: '617885008184',
      department: 'INTERACTIVE SOFTWARE',
      departmentId: 9,
      modelNumber: 'CPFA115536-03',
      classId: 99,
      quantity: 1
    },
    {
      name: 'Metra - Installation Kit for Select Honda Vehicles - Black',
      sku: 9797981,
      upc: '086429215126',
      department: 'MOBILE AUDIO',
      departmentId: 11,
      modelNumber: 'IBR-807HD',
      classId: 18,
      quantity: 1
    },
    {
      name: 'Apple - BREAST TEST NEST',
      sku: 9175320,
      upc: '817347123934',
      department: 'TABLETS',
      departmentId: 3,
      modelNumber: 'T3ST05',
      classId: 666,
      quantity: 12
    },
    {
      name: 'Apple - Apple Pencil for iPad Pro - White',
      sku: 4538802,
      upc: '888462313674',
      department: 'COMPUTERS',
      departmentId: 6,
      modelNumber: 'MK0C2AM/A',
      classId: 492,
      quantity: 5
    },
    {
      name: 'Apple - TEST TEST TEST',
      sku: 9234812,
      upc: '719284372618',
      department: 'APPLIANCES',
      departmentId: 7,
      modelNumber: 'T3ST071/B',
      classId: 420,
      quantity: 2
    }
  ],
  formatted: false
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
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? { ...product, quantity: product.quantity + 1 }
              : product
        )
      };
    case DECREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? { ...product, quantity: product.quantity - 1 }
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
    default:
      return state;
  }
}
