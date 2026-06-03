import { createFileRoute, useParams } from "@tanstack/react-router";
import { FormationForm } from "@/components/formation-form";
import { useAppStore } from "@/store/appStore";

export const Route = createFileRoute("/admin/formations/$id/edit")({
  component: EditPage,
});

function EditPage() {
  const { id } = useParams({ from: "/admin/formations/$id/edit" });
  const f = useAppStore((s) => s.getFormation(id));
  return <FormationForm titre={f ? `Éditer : ${f.titre}` : "Édition"} />;
}
