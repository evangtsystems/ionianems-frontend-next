// constants.js or constants/index.js

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ionianems.com';

export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const USERS_URL = `${BASE_URL}/api/users`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;

