"use client";
import { useState, useCallback } from "react";
import { FileUploadCard } from "./file-upload-card";

export const FileUpload = ({
  accept = "image/*",
  hint,
  onUploadComplete,
}) => {
  const [files, setFiles] = useState([]);

  const matchesAccept = (file, accept) => {
    if (!accept || accept === "*/*") return true;
    return accept.split(",").some((type) => {
      const t = type.trim();
      if (t.endsWith("/*")) return file.type.startsWith(t.slice(0, -1));
      return file.type === t;
    });
  };

  const handleFilesChange = useCallback(
    async (newFiles) => {
      const filtered = newFiles.filter((f) => matchesAccept(f, accept));

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
      accept={accept}
      hint={hint}
      onFilesChange={handleFilesChange}
      onFileRemove={handleFileRemove}
    />
  );
};
