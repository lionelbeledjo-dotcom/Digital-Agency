import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { XCircle } from "lucide-react";

export const Route = createFileRoute("/paiement/annule")({
  head: () => ({ meta: [{ title: "Paiement annulé · LB Digital" }] }),
  component: AnnulePage,
});

function AnnulePage() {
  return (
    <PublicLayout>
      <section className="py-24">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gold/20">
            <XCircle className="h-14 w-14 text-gold" />
          </div>
          <h1 className="mt-8 text-3xl font-bold">Paiement non complété</h1>
          <p className="mt-3 text-muted-foreground">Ne t'inquiète pas, aucun montant n'a été débité.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/paiement" className="rounded-full gradient-cobalt px-6 py-3 text-sm font-semibold text-white">Réessayer →</Link>
            <Link to="/contact" className="rounded-full border border-border px-6 py-3 text-sm font-semibold">Contacter le support</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
