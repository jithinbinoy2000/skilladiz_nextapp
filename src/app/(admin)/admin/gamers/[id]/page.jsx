import GamerDetail from "@/components/admin/GamerDetail";

export const metadata = {
  title: "Gamer Detail — Skilladiz Admin",
};

export default function GamerDetailPage({ params }) {
  return <GamerDetail id={params.id} />;
}
