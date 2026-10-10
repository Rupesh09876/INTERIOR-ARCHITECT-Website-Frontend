import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Loader2, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';
import { getImageUrl } from '../../lib/imageUrl';

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  hint?: string;
  maxFiles?: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  values,
  onChange,
  label = 'Gallery Images',
  hint = 'Select or drop multiple images (JPG, PNG, WebP, max 5MB each)',
  maxFiles = 20,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFiles = async (files: FileList | File[]) => {
    setUploadError(null);
    setUploadSuccess(null);

    const fileList = Array.from(files);
    if (fileList.length === 0) return;

    if (values.length + fileList.length > maxFiles) {
      setUploadError(`Maximum ${maxFiles} gallery images allowed.`);
      return;
    }

    // Validate all files
    for (const f of fileList) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        setUploadError(`"${f.name}" is not a supported format. Please use JPEG, PNG, WebP, or GIF.`);
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        setUploadError(`"${f.name}" exceeds the 5MB size limit (${formatFileSize(f.size)}).`);
        return;
      }
    }

    setUploading(true);
    const uploadedUrls: string[] = [];
    let failureCount = 0;

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        try {
          const res = await api.media.upload(file);
          const uploadedUrl = res.url || res.file_url || res.relative_url;
          if (uploadedUrl) {
            uploadedUrls.push(uploadedUrl);
          }
        } catch (e: any) {
          failureCount++;
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...values, ...uploadedUrls]);
        setUploadSuccess(
          `Uploaded ${uploadedUrls.length} image${uploadedUrls.length > 1 ? 's' : ''} successfully${
            failureCount > 0 ? ` (${failureCount} failed)` : ''
          }.`
        );
        setTimeout(() => setUploadSuccess(null), 4000);
      } else if (failureCount > 0) {
        setUploadError('Failed to upload the selected images. Please check connection and try again.');
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [values, maxFiles]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleRemove = (index: number) => {
    const updated = values.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleAddUrl = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChange([...values, urlInput.trim()]);
    setUrlInput('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="admin-field-label mb-0">{label}</label>
        <span className="text-xs text-stone-400">
          {values.length} / {maxFiles} images
        </span>
      </div>

      {/* Hidden Multi-file Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={onFileSelect}
        className="hidden"
        id={`multi-upload-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[110px] ${
          isDragging
            ? 'border-amber-500 bg-amber-500/10'
            : 'border-stone-700 hover:border-amber-600/70 bg-stone-900/40 hover:bg-stone-900/70'
        } ${uploading ? 'pointer-events-none opacity-80' : ''}`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <Loader2 size={24} className="text-amber-500 animate-spin" />
            <p className="text-xs text-stone-300 font-medium">Uploading images from device...</p>
          </div>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1.5">
              <UploadCloud size={18} />
            </div>
            <p className="text-xs font-medium text-stone-200">
              <span className="text-amber-400 underline underline-offset-2">Upload Images</span> from your device
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">{hint}</p>
          </>
        )}
      </div>

      {/* Optional URL input fallback */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl(e))}
          placeholder="Or paste external image URL and click Add"
          className="admin-field-input text-xs py-1.5 flex-1"
        />
        <button
          type="button"
          onClick={handleAddUrl}
          disabled={!urlInput.trim()}
          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 text-xs font-medium rounded border border-stone-700 transition flex items-center gap-1"
        >
          <Plus size={13} /> Add URL
        </button>
      </div>

      {/* Feedback Messages */}
      {uploadSuccess && (
        <p className="text-xs text-emerald-400 flex items-center gap-1">
          <CheckCircle2 size={13} /> {uploadSuccess}
        </p>
      )}
      {uploadError && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={13} /> {uploadError}
        </p>
      )}

      {/* Thumbnails Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1">
          {values.map((url, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-md overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-600/60 transition"
            >
              <img
                src={getImageUrl(url)}
                alt={`Gallery thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="p-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white shadow-md transition"
                  title="Remove image"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded bg-black/60 text-[9px] text-stone-300 font-mono">
                #{i + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiImageUpload;
