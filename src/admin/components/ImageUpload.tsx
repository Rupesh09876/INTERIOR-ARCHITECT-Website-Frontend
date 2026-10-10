import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw, Loader2, Link2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';
import { getImageUrl } from '../../lib/imageUrl';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  allowUrlFallback?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Image',
  required = false,
  error,
  hint = 'Supports JPG, PNG, WebP, GIF up to 5MB',
  allowUrlFallback = true,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [showUrlMode, setShowUrlMode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFile = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(null);

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Invalid format. Please select a JPEG, PNG, WebP, or GIF image.');
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`File is too large (${formatFileSize(file.size)}). Maximum allowed size is 5 MB.`);
      return;
    }

    setFileDetails({
      name: file.name,
      size: formatFileSize(file.size),
    });

    try {
      setUploading(true);
      setUploadProgress(35);

      const res = await api.media.upload(file);
      setUploadProgress(100);

      // Backend returns either `url` or `relative_url` or `file_url`
      const uploadedUrl = res.url || res.file_url || res.relative_url;
      if (!uploadedUrl) {
        throw new Error('Upload succeeded but server did not return a valid URL.');
      }

      onChange(uploadedUrl);
      setUploadSuccess(`Uploaded ${file.name} successfully`);
      setTimeout(() => setUploadSuccess(null), 4000);
    } catch (err: any) {
      const msg = err.message || 'Failed to upload image. Please check your connection and try again.';
      setUploadError(msg);
    } finally {
      setUploading(false);
      setUploadProgress(0);
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
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setFileDetails(null);
    setUploadError(null);
    setUploadSuccess(null);
  };

  const displayUrl = value ? getImageUrl(value) : '';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="admin-field-label mb-0">
          {label} {required && <span className="text-amber-500">*</span>}
        </label>
        {allowUrlFallback && (
          <button
            type="button"
            onClick={() => setShowUrlMode((v) => !v)}
            className="text-xs text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <Link2 size={12} />
            {showUrlMode ? 'Upload from Device' : 'Or use Image URL'}
          </button>
        )}
      </div>

      {showUrlMode ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="admin-field-input"
            placeholder="https://images.unsplash.com/... or paste image URL"
          />
          {value && (
            <div className="relative group rounded-lg overflow-hidden border border-stone-800 bg-stone-900/60 max-h-48 w-full">
              <img
                src={displayUrl}
                alt="Preview"
                className="w-full h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format';
                }}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-red-900/80 hover:bg-red-700 text-white rounded transition"
                title="Remove image"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Hidden native input with strict accept attributes */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={onFileSelect}
            className="hidden"
            id={`upload-${label.toLowerCase().replace(/\s+/g, '-')}`}
          />

          {/* If image is already present */}
          {value && !uploading ? (
            <div className="rounded-lg border border-stone-700 bg-stone-900/80 p-3 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-28 h-24 shrink-0 rounded overflow-hidden bg-black/40 border border-stone-800">
                <img
                  src={displayUrl}
                  alt="Current preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 text-left w-full">
                <p className="text-xs font-medium text-stone-200 truncate">
                  {fileDetails?.name || value.split('/').pop() || 'Uploaded image'}
                </p>
                {fileDetails?.size && (
                  <p className="text-[11px] text-stone-400 mt-0.5">Size: {fileDetails.size}</p>
                )}
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 transition"
                  >
                    <RefreshCw size={12} /> Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/60 transition"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Upload Dropzone */
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[140px] ${
                isDragging
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-stone-700 hover:border-amber-600/70 bg-stone-900/40 hover:bg-stone-900/70'
              } ${uploading ? 'pointer-events-none opacity-80' : ''}`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <Loader2 size={28} className="text-amber-500 animate-spin" />
                  <p className="text-xs text-stone-300 font-medium">Uploading image from device...</p>
                  <div className="w-48 bg-stone-800 rounded-full h-1.5 overflow-hidden mt-1">
                    <div
                      className="bg-amber-500 h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                    <UploadCloud size={20} />
                  </div>
                  <p className="text-xs font-medium text-stone-200">
                    <span className="text-amber-400 underline underline-offset-2">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">{hint}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600/90 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded shadow transition">
                    <ImageIcon size={13} /> Upload Image
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Upload feedback */}
      {uploadSuccess && (
        <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
          <CheckCircle2 size={13} /> {uploadSuccess}
        </p>
      )}
      {uploadError && (
        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
          <AlertCircle size={13} /> {uploadError}
        </p>
      )}
      {error && !uploadError && (
        <p className="admin-field-error">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
