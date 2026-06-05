import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAppStore } from "@/store/appStore";

export interface RealProfile {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  whatsapp: string;
  pays: string;
  plan: "starter" | "club_ia" | "pro_creator";
  role: "member" | "admin";
  lien_affilie: string;
  date_inscription: string;
  statut: string;
}

export function useProfile() {
  const demoMode = useAppStore((s) => s.demoMode);
  const mockUser = useAppStore((s) => s.currentUser);
  const [profile, setProfile] = useState<RealProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (demoMode !== "visitor" && mockUser) {
      setProfile({
        id: mockUser.id,
        prenom: mockUser.prenom,
        nom: mockUser.nom,
        email: mockUser.email,
        whatsapp: mockUser.whatsapp,
        pays: mockUser.pays,
        plan: mockUser.plan,
        role: "member",
        lien_affilie: mockUser.lienAffilie,
        date_inscription: mockUser.dateInscription,
        statut: "actif",
      });
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setProfile(data as RealProfile);
      }
      setLoading(false);
    });
  }, [demoMode, mockUser]);

  return { profile, loading };
}
