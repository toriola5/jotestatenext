"use client";

import {
  useActionState,
  useRef,
  useState,
  useEffect,
  startTransition,
} from "react";
import Image from "next/image";
import { X, Upload, ImagePlus, Video } from "lucide-react";
import {
  nigerianStates,
  propertyFeatures,
  propertyTypes,
  listingTypes,
} from "@/lib/constants";
import {
  uploadPropertyAction,
  updatePropertyAction,
} from "@/actions/propertyActions";
import {
  uploadImageToStorage,
  uploadVideoToStorage,
} from "@/lib/storage-client";
import type { Property } from "@/lib/propertyQuery";

const VALID_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const VALID_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

type Props = {
  property?: Property;
};

const INPUT =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 bg-white";
const LABEL =
  "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";
const SECTION =
  "bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 space-y-5";

export default function PropertyForm({ property }: Props) {
  const isEdit = !!property;
  const action = isEdit ? updatePropertyAction : uploadPropertyAction;
  const [state, formAction, pending] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    property?.images ?? [],
  );
  const [existingVideos, setExistingVideos] = useState<string[]>(
    property?.video_urls ?? [],
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    property?.features ?? [],
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      videoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImageFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const removeImagePreview = (i: number) => {
    URL.revokeObjectURL(imagePreviews[i]);
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
    setImageFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleVideos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setVideoFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setVideoPreviews((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const removeVideoPreview = (i: number) => {
    URL.revokeObjectURL(videoPreviews[i]);
    setVideoPreviews((prev) => prev.filter((_, idx) => idx !== i));
    setVideoFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

  const removeExistingImage = (i: number) =>
    setExistingImages((prev) => prev.filter((_, idx) => idx !== i));

  const removeExistingVideo = (i: number) =>
    setExistingVideos((prev) => prev.filter((_, idx) => idx !== i));

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadError(null);

    if (existingImages.length + imageFiles.length === 0) {
      setUploadError("At least one image is required.");
      return;
    }
    if (imageFiles.some((f) => !VALID_IMAGE_TYPES.includes(f.type))) {
      setUploadError("Only JPG, PNG, and WebP images are allowed.");
      return;
    }
    if (imageFiles.some((f) => f.size > MAX_IMAGE_SIZE)) {
      setUploadError("Each image must be under 5MB.");
      return;
    }
    if (videoFiles.some((f) => !VALID_VIDEO_TYPES.includes(f.type))) {
      setUploadError("Only MP4, WebM, and MOV videos are allowed.");
      return;
    }
    if (videoFiles.some((f) => f.size > MAX_VIDEO_SIZE)) {
      setUploadError("Each video must be under 100MB.");
      return;
    }

    setUploading(true);
    try {
      const [newImageUrls, newVideoUrls] = await Promise.all([
        Promise.all(imageFiles.map(uploadImageToStorage)),
        Promise.all(videoFiles.map(uploadVideoToStorage)),
      ]);

      const imageUrls = [...existingImages, ...newImageUrls];
      const videoUrls = [...existingVideos, ...newVideoUrls];

      const fd = new FormData(formRef.current!);
      imageUrls.forEach((url) => fd.append("imageUrls", url));
      videoUrls.forEach((url) => fd.append("videoUrls", url));

      startTransition(() => {
        formAction(fd);
      });
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  const isBusy = uploading || pending;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {isEdit && <input type="hidden" name="propertyId" value={property.id} />}

      {(uploadError ?? state?.error) && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm">
          {uploadError ?? state?.error}
        </div>
      )}

      {/* Basic Info */}
      <div className={SECTION}>
        <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-3">
          Basic Information
        </h3>

        <div>
          <label className={LABEL}>Property Title *</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={property?.title}
            placeholder="e.g. Luxury 3 Bedroom Duplex in Lekki"
            className={INPUT}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={LABEL}>Property Type *</label>
            <select
              name="propertyType"
              required
              defaultValue={property?.property_type ?? ""}
              className={INPUT}
            >
              <option value="">Select type</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL}>Listing Type *</label>
            <select
              name="listingType"
              required
              defaultValue={property?.listing_type ?? ""}
              className={INPUT}
            >
              <option value="">Select type</option>
              {listingTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={LABEL}>Price (₦) *</label>
          <input
            type="number"
            name="price"
            required
            min={0}
            defaultValue={property?.price}
            placeholder="e.g. 5000000"
            className={INPUT}
          />
        </div>

        <div>
          <label className={LABEL}>Description *</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={property?.description}
            placeholder="Describe the property..."
            className={`${INPUT} resize-none`}
          />
        </div>
      </div>

      {/* Property Details */}
      <div className={SECTION}>
        <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-3">
          Property Details
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Bedrooms", name: "bedrooms", value: property?.bedrooms },
            {
              label: "Bathrooms",
              name: "bathrooms",
              value: property?.bathrooms,
            },
            { label: "Toilets", name: "toilet", value: property?.toilet },
            { label: "Size (sqm)", name: "size", value: property?.size },
          ].map(({ label, name, value }) => (
            <div key={name}>
              <label className={LABEL}>{label}</label>
              <input
                type="number"
                name={name}
                min={0}
                defaultValue={value ?? ""}
                className={INPUT}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className={SECTION}>
        <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-3">
          Location
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={LABEL}>State *</label>
            <select
              name="state"
              required
              defaultValue={property?.state ?? ""}
              className={INPUT}
            >
              <option value="">Select state</option>
              {nigerianStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL}>City *</label>
            <input
              type="text"
              name="city"
              required
              defaultValue={property?.city}
              placeholder="e.g. Lekki"
              className={INPUT}
            />
          </div>
        </div>

        <div>
          <label className={LABEL}>Address *</label>
          <input
            type="text"
            name="address"
            required
            defaultValue={property?.address}
            placeholder="e.g. 12 Admiralty Way, Lekki Phase 1"
            className={INPUT}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={LABEL}>Latitude</label>
            <input
              type="number"
              name="latitude"
              step="any"
              defaultValue={property?.latitude ?? ""}
              placeholder="e.g. 6.4281"
              className={INPUT}
            />
          </div>
          <div>
            <label className={LABEL}>Longitude</label>
            <input
              type="number"
              name="longitude"
              step="any"
              defaultValue={property?.longitude ?? ""}
              placeholder="e.g. 3.4219"
              className={INPUT}
            />
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Open{" "}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] underline"
          >
            Google Maps
          </a>
          , right-click the exact property location, and the coordinates appear
          at the top of the menu — copy the first number (latitude) and the
          second (longitude).
        </p>
      </div>

      {/* Features */}
      <div className={SECTION}>
        <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-3">
          Features & Amenities
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {propertyFeatures.map((f) => {
            const checked = selectedFeatures.includes(f);
            return (
              <label
                key={f}
                onClick={() => toggleFeature(f)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${
                  checked
                    ? "bg-red-50 border-red-300 text-red-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  name="features"
                  value={f}
                  checked={checked}
                  onChange={() => {}}
                  className="accent-red-500"
                />
                {f}
              </label>
            );
          })}
        </div>
      </div>

      {/* Images */}
      <div className={SECTION}>
        <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-3">
          Images {!isEdit && <span className="text-red-500">*</span>}
        </h3>

        {isEdit && existingImages.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-2">Current images</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {existingImages.map((url, i) => (
                <div
                  key={url}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group"
                >
                  <Image
                    src={url}
                    alt={`img ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-red-400 rounded-xl py-8 cursor-pointer transition-colors">
          <ImagePlus size={24} className="text-gray-400" />
          <span className="text-sm text-gray-500">
            {isEdit ? "Add more images" : "Click to upload images"}
          </span>
          <span className="text-xs text-gray-400">
            JPG, PNG, WebP — max 5MB each
          </span>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImages}
            className="hidden"
          />
        </label>

        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {imagePreviews.map((src, i) => (
              <div
                key={i}
                className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 group"
              >
                <Image
                  src={src}
                  alt={`preview ${i + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImagePreview(i)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Videos */}
      <div className={SECTION}>
        <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-3">
          Videos{" "}
          <span className="text-gray-400 font-normal text-xs">(optional)</span>
        </h3>

        {isEdit && existingVideos.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-2">Current videos</p>
            <div className="space-y-2 mb-4">
              {existingVideos.map((url, i) => (
                <div
                  key={url}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                >
                  <Video size={16} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-600 truncate flex-1">
                    Video {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExistingVideo(i)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-red-400 rounded-xl py-6 cursor-pointer transition-colors">
          <Video size={22} className="text-gray-400" />
          <span className="text-sm text-gray-500">Upload property video</span>
          <span className="text-xs text-gray-400">
            MP4, WebM — max 100MB each
          </span>
          <input
            type="file"
            multiple
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleVideos}
            className="hidden"
          />
        </label>

        {videoPreviews.length > 0 && (
          <div className="space-y-2 mt-3">
            {videoPreviews.map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
              >
                <Video size={16} className="text-gray-400 shrink-0" />
                <span className="text-xs text-gray-600 truncate flex-1">
                  Video {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeVideoPreview(i)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pb-8">
        <button
          type="submit"
          disabled={isBusy}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl disabled:opacity-60 transition-colors order-1 sm:order-0"
        >
          <Upload size={16} />
          {uploading
            ? "Uploading files..."
            : pending
              ? isEdit
                ? "Saving..."
                : "Uploading..."
              : isEdit
                ? "Save Changes"
                : "Upload Property"}
        </button>
        <a
          href="/admin/properties"
          className="px-6 py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-xl text-sm text-center transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
