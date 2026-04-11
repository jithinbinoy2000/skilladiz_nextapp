import * as React from "react";
import { UploadCloud, X, CheckCircle2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export const FileUploadCard = React.forwardRef(
  ({ className, files = [], onFilesChange, onFileRemove, onClose, accept, hint, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef(null);

    const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDragOver  = (e) => { e.preventDefault(); e.stopPropagation(); };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const dropped = Array.from(e.dataTransfer.files);
      if (dropped.length > 0) onFilesChange(dropped);
    };

    const handleFileSelect = (e) => {
      const selected = Array.from(e.target.files || []);
      if (selected.length > 0) onFilesChange(selected);
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 KB";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "w-full rounded-xl border border-gray-200 bg-white shadow-sm",
          className
        )}
        {...props}
      >
        {/* Drop zone */}
        <div className="p-4">
          {onClose && (
            <div className="flex justify-end mb-2">
              <button
                onClick={onClose}
                className="flex items-center justify-center text-gray-400 transition-colors rounded-full w-7 h-7 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200",
              isDragging
                ? "border-brand-400 bg-brand-50"
                : "border-gray-200 hover:border-brand-300 hover:bg-gray-50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={accept}
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className={cn(
              "w-11 h-11 flex items-center justify-center rounded-full mb-3 transition-colors",
              isDragging ? "bg-brand-100" : "bg-gray-100"
            )}>
              <UploadCloud className={cn("w-5 h-5", isDragging ? "text-brand-500" : "text-gray-400")} />
            </div>
            <p className="text-sm font-semibold text-gray-700">
              Drop files here or{" "}
              <span className="text-brand-500">browse</span>
            </p>
            <p className="mt-1 text-xs text-gray-400">{hint ?? "JPEG, PNG, PDF — up to 50 MB"}</p>
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100">
            <ul className="space-y-3">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.li
                    key={file.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    layout
                    className="flex items-center gap-3"
                  >
                    {/* File type badge */}
                    <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-[10px] font-bold text-gray-500 uppercase">
                      {file.file.type.split("/")[1]?.substring(0, 3) || "file"}
                    </div>

                    {/* Name + progress */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">{file.file.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-gray-400">{formatFileSize(file.file.size)}</span>
                        <span className="text-gray-300">•</span>
                        <span className={cn(
                          "text-[11px] font-medium",
                          file.status === "completed" ? "text-green-500" : "text-brand-500"
                        )}>
                          {file.status === "completed" ? "Done" : "Uploading…"}
                        </span>
                      </div>
                      {file.status === "uploading" && (
                        <Progress value={file.progress} className="h-1 mt-1.5" />
                      )}
                    </div>

                    {/* Status / remove */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {file.status === "completed" && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                      <button
                        onClick={() => onFileRemove(file.id)}
                        className="flex items-center justify-center text-gray-400 transition-colors rounded-full w-7 h-7 hover:bg-gray-100 hover:text-red-500"
                      >
                        {file.status === "completed" ? <Trash2 className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </motion.div>
    );
  }
);
FileUploadCard.displayName = "FileUploadCard";
