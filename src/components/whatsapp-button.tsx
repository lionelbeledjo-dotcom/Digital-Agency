import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/237600000000?text=Bonjour%20Digital%20Agency%20!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
      aria-label="Nous contacter sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
