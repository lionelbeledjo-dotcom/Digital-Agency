const CINETPAY_API_KEY = import.meta.env.VITE_CINETPAY_API_KEY || "";
const CINETPAY_SITE_ID = import.meta.env.VITE_CINETPAY_SITE_ID || "";

export interface CinetPayConfig {
  amount: number;
  currency: "XOF" | "XAF" | "USD" | "EUR";
  description: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  transactionId: string;
  returnUrl: string;
  notifyUrl: string;
  channels: ("MOBILE_MONEY" | "CREDIT_CARD" | "WALLET")[];
}

export function initCinetPay(config: CinetPayConfig) {
  return new Promise<{ paymentUrl: string }>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("CinetPay requires browser"));
      return;
    }

    const w = window as unknown as { CinetPay?: { setConfig: (c: unknown) => void; getCheckout: (c: unknown) => void } };

    if (!w.CinetPay) {
      reject(new Error("CinetPay SDK not loaded"));
      return;
    }

    w.CinetPay.setConfig({
      apikey: CINETPAY_API_KEY,
      site_id: CINETPAY_SITE_ID,
      notify_url: config.notifyUrl,
      return_url: config.returnUrl,
      mode: "PRODUCTION",
    });

    w.CinetPay.getCheckout({
      transaction_id: config.transactionId,
      amount: config.amount,
      currency: config.currency,
      channels: config.channels.join(","),
      description: config.description,
      customer_name: config.customerName,
      customer_email: config.customerEmail,
      customer_phone_number: config.customerPhone || "",
      customer_city: "",
      customer_country: "CI",
      customer_state: "",
      customer_zip_code: "",
    });

    resolve({ paymentUrl: "" });
  });
}

export function generateTransactionId(): string {
  return `DA-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
