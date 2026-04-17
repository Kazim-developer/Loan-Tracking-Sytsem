export function openCheckout(
  priceId: string,
  email: string,
  accountId: string,
  isAddon: boolean,
  addonType?: string,
  addonQuantity?: number,
) {
  if (!window.Paddle?.Checkout) return;

  window.Paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],

    customer: {
      email,
    },

    customData: {
      accountId,
      isAddon,
      addonType,
      addonQuantity,
    },
  });
}
