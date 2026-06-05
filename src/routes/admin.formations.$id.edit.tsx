import { createFileRoute, useParams } from "@tanstack/react-router";
import { FormationForm } from "@/components/formation-form";
import { useAppStore } from "@/store/appStore";

export const Route = createFileRoute("/admin/formations/$id/edit")({
  component: EditPage,
});

function EditPage() {
  const { id } = useParams({ from: "/admin/formations/$id/edit" });
  const f = useAppStore((s) => s.getFormation(id));

  if (!f) return <div className="p-8"><p className="text-foreground">Formation introuvable.</p></div>;

  return (
    <FormationForm
      titre={`Éditer : ${f.titre}`}
      initial={{
        id: f.id,
        slug: f.slug,
        titre: f.titre,
        description: f.description,
        categorie: f.categorie,
        niveau: f.niveau,
        acces: f.acces,
        duree: f.duree,
        emoji: f.emoji,
        modules: f.modules,
        apprentissages: f.apprentissages,
      }}
    />
  );
}
