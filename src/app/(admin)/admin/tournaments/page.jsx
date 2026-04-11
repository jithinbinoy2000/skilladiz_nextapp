import TournamentsManager from "@/components/admin/TournamentsManager";

export const dynamic = "force-dynamic";

export default function TournamentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">Tournament Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Create, manage, and publish tournament results
        </p>
      </div>
      <TournamentsManager />
    </div>
  );
}
