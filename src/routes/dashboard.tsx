import { createFileRoute } from "@tanstack/react-router";
import { MemberLayout } from "@/components/member-layout";

export const Route = createFileRoute("/dashboard")({
  component: MemberLayout,
});
