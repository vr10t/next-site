import React, { ReactNode } from 'react';
import { CartProvider } from 'use-shopping-cart';
import getStripe from '../../utils/getStripe';
import * as config from '../../config';

const Cart = ({ children }: { children: ReactNode }) => (
  <CartProvider
  cartMode='checkout-session'
    
    stripe={getStripe()}
    currency={config.CURRENCY}
  >
    <>{children}</>
  </CartProvider>
);

export default Cart;