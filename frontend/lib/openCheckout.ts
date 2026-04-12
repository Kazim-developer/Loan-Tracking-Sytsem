export function openCheckout(
  priceId: string,
  email: string,
  userId: string,
  accountId: string,
) {
  if (!window.Paddle?.Checkout) return;

  window.Paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customer: { email },
    customerData: {
      userId,
      accountId,
    },
  });
}
