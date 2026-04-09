"use client";
import { useState, useCallback } from "react";
import { FileUploadCard } from "./file-upload-card";

export const FileUpload = ({
  accept = "image/*",
  onUploadComplete,
}) => {
  const [files, setFiles] = useState([]);

  const handleFilesChange = useCallback(
    async (newFiles) => {
      const filtered = accept === "image/*"
        ? newFiles.filter((f) => f.type.startsWith("image/"))
        : newFiles;

      const entries = filtered.map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        file: f,
        status: "uploading",
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...entries]);

      for (const entry of entries) {
        const tick = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id && f.status === "uploading"
                ? { ...f, progress: Math.min(f.progress + 20, 90) }
                : f
            )
          );
        }, 200);

        try {
          const body = new FormData();
          body.append("file", entry.file);
          const res = await fetch("/api/upload", { method: "POST", body });
          const data = await res.json();
          clearInterval(tick);

          setFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id
                ? { ...f, status: "completed", progress: 100, asset: data.asset }
                : f
            )
          );

          if (onUploadComplete) onUploadComplete(data.asset);

          // Remove completed entry after a short delay — parent already has the URL
          setTimeout(() => {
            setFiles((prev) => prev.filter((f) => f.id !== entry.id));
          }, 1500);
        } catch (err) {
          clearInterval(tick);
          console.error("Upload failed:", err);
          setFiles((prev) => prev.filter((f) => f.id !== entry.id));
        }
      }
    },
    [accept, onUploadComplete]
  );

  const handleFileRemove = useCallback((id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <FileUploadCard
      files={files}
      onFilesChange={handleFilesChange}
      onFileRemove={handleFileRemove}
    />
  );
};
