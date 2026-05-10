function mapPaddleStatus(status: string) {
  switch (status) {
    case "active":
      return "ACTIVE";

    case "expired":
      return "EXPIRED";

    case "past_due":
      return "PAST_DUE";

    case "canceled":
      return "CANCELED";

    default:
      throw new Error(`Unhandled Paddle subscription status: ${status}`);
  }
}

export default mapPaddleStatus;
