const Stripe = require('stripe');

// Check if Stripe secret key is provided
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY not provided. Payment functionality will be disabled.');
  
  // Export mock Stripe functions
  module.exports = {
    stripe: null,
    createPaymentIntent: async () => {
      throw new Error('Stripe not configured');
    },
    createCheckoutSession: async () => {
      throw new Error('Stripe not configured');
    },
    constructEventFromPayload: async () => {
      throw new Error('Stripe not configured');
    },
    formatAmountForStripe: (amount, currency = 'usd') => amount,
    formatAmountFromStripe: (amount, currency = 'usd') => amount
  };
  return;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use latest API version
  appInfo: {
    name: 'ShopSwift',
    version: '1.0.0'
  }
});

module.exports = {
  stripe,
  createPaymentIntent: async (amount, currency = 'usd', metadata = {}) => {
    return stripe.paymentIntents.create({
      amount,
      currency,
      metadata
    });
  },
  createCheckoutSession: async (options) => {
    return stripe.checkout.sessions.create(options);
  },
  constructEventFromPayload: async (payload, sigHeader) => {
    return stripe.webhooks.constructEvent(
      payload,
      sigHeader,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  },
  formatAmountForStripe: (amount, currency = 'usd') => {
    return Math.round(amount * 100);
  },
  formatAmountFromStripe: (amount, currency = 'usd') => {
    return amount / 100;
  }
};