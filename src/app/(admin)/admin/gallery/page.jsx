import GalleryManager from "@/components/admin/GalleryManager";

export const dynamic = "force-dynamic";

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">Gallery Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Upload and manage images, videos, and embedded content
        </p>
      </div>
      <GalleryManager />
    </div>
  );
}
