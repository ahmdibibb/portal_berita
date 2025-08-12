"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  label = "Upload Gambar",
  placeholder = "Pilih file gambar atau drag & drop di sini",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = useCallback(
    async (file: File) => {
      if (!file) return;

      // Validasi tipe file
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Tipe file tidak didukung. Gunakan JPEG, PNG, atau WebP.");
        return;
      }

      // Validasi ukuran file (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Ukuran file terlalu besar. Maksimal 5MB.");
        return;
      }

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload gagal");
        }

        onChange(data.imageUrl);
        toast.success("Gambar berhasil diupload");
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload gagal";
        toast.error("Upload gagal: " + errorMessage);
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        uploadImage(file);
      }
    },
    [uploadImage]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        uploadImage(files[0]);
      }
    },
    [uploadImage]
  );

  const handleRemove = () => {
    onChange("");
    if (onRemove) {
      onRemove();
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {!value ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-gray-400"
          } ${
            disabled || isUploading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <div className="text-sm text-gray-600">
              <span className="font-medium text-primary hover:text-primary/80">
                Klik untuk upload
              </span>{" "}
              atau drag & drop
            </div>
            <p className="text-xs text-gray-500">{placeholder}</p>
            <p className="text-xs text-gray-400">PNG, JPG, WebP hingga 10MB</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative h-40 w-full rounded-lg overflow-hidden border">
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity" />
          </div>

          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={openFileDialog}
              disabled={disabled || isUploading}
              className="h-8 w-8 p-0"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              disabled={disabled || isUploading}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Mengupload gambar...</span>
        </div>
      )}
    </div>
  );
}
