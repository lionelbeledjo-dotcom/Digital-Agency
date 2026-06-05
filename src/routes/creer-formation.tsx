import { createFileRoute } from "@tanstack/react-router";
import { FormationForm } from "@/components/formation-form";

export const Route = createFileRoute("/creer-formation")({
  head: () => ({ meta: [{ title: "Nouvelle formation · Admin" }] }),
  component: FormationForm,
});
