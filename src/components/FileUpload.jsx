"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export const FileUpload = ({
  accept = "image/*",     
  multiple = true,
  onUploadComplete,    
}) => {
  const fileInputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const body = new FormData();
    const previewUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        console.warn("Not an image:", file.name);
        continue;
      }

      body.append("file", file);

      const url = URL.createObjectURL(file);
      previewUrls.push(url);
    }

    setPreviews(previewUrls);

    // try {
    //   const res = await fetch("/api/upload", {
    //     method: "POST",
    //     body,
    //   });

    //   const data = await res.json();

    //   if (onUploadComplete) {
    //     onUploadComplete(data); // no state lifting needed
    //   }

    //   console.log("Upload success:", data);
    // } catch (err) {
    //   console.error("Upload failed:", err);
    // }
  };

  return (
    <div className="space-y-3">
      {/* File input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept} 
        multiple={multiple}
        onChange={handleFileChange}
        className="w-full py-2 border rounded-lg"
      />

      {/* Preview */}
      <div className="flex flex-wrap gap-3">
        {previews.map((url, index) => (
          <Image
            key={index}
            src={url}
            width={100}
            height={100}
            alt="preview"
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};