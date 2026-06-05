import { createFileRoute } from "@tanstack/react-router";
import { FormationForm } from "@/components/formation-form";

export const Route = createFileRoute("/admin/nouvelle-formation")({
  component: FormationForm,
});
