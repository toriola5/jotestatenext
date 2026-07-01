"use client";

import { useActionState, useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, ImagePlus, Video } from "lucide-react";
import { nigerianStates, propertyFeatures, propertyTypes, listingTypes } from "@/lib/constants";
import { uploadPropertyAction, updatePropertyAction } from "@/actions/propertyActions";
import type { Property } from "@/lib/propertyQuery";

type Props = {
  property?: Property;
};

const INPUT =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 bg-white";
const LABEL = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";
const SECTION = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5";

export default function PropertyForm({ property }: Props) {
  const isEdit = !!property;
  const action = isEdit ? updatePropertyAction : uploadPropertyAction;
  const [state, formAction, pending] = useActionState(action, null);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    property?.features ?? []
  );

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      videoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImagePreview = (i: number) => {
    URL.revokeObjectURL(imagePreviews[i]);
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleVideos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const previews = files.map((f) => URL.createObjectURL(f));
    setVideoPreviews((prev) => [...prev, ...previews]);
  };

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && (
        <input type="hidden" name="propertyId" value={property.id} />
      )}

      {state?.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm">
          {state.error}
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
            <select name="propertyType" required defaultValue={property?.property_type ?? ""} className={INPUT}>
              <option value="">Select type</option>
              {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Listing Type *</label>
            <select name="listingType" required defaultValue={property?.listing_type ?? ""} className={INPUT}>
              <option value="">Select type</option>
              {listingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
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
            { label: "Bathrooms", name: "bathrooms", value: property?.bathrooms },
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
            <select name="state" required defaultValue={property?.state ?? ""} className={INPUT}>
              <option value="">Select state</option>
              {nigerianStates.map((s) => <option key={s} value={s}>{s}</option>)}
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

        {isEdit && property.images?.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-2">Current images</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {property.images.map((url, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                  <Image src={url} alt={`img ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-red-400 rounded-xl py-8 cursor-pointer transition-colors">
          <ImagePlus size={24} className="text-gray-400" />
          <span className="text-sm text-gray-500">
            {isEdit ? "Upload new images (replaces existing)" : "Click to upload images"}
          </span>
          <span className="text-xs text-gray-400">JPG, PNG, WebP — max 5MB each</span>
          <input
            type="file"
            name="images"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImages}
            className="hidden"
            required={!isEdit}
          />
        </label>

        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 group">
                <Image src={src} alt={`preview ${i + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeImagePreview(i)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
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
          Videos <span className="text-gray-400 font-normal text-xs">(optional)</span>
        </h3>

        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-red-400 rounded-xl py-6 cursor-pointer transition-colors">
          <Video size={22} className="text-gray-400" />
          <span className="text-sm text-gray-500">Upload property video</span>
          <span className="text-xs text-gray-400">MP4, WebM — max 100MB each</span>
          <input
            type="file"
            name="videos"
            multiple
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleVideos}
            className="hidden"
          />
        </label>

        {videoPreviews.length > 0 && (
          <div className="space-y-2 mt-3">
            {videoPreviews.map((_, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                <Video size={16} className="text-gray-400 shrink-0" />
                <span className="text-xs text-gray-600 truncate flex-1">Video {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setVideoPreviews((prev) => prev.filter((_, idx) => idx !== i))}
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
      <div className="flex items-center gap-4 pb-8">
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl disabled:opacity-60 transition-colors"
        >
          <Upload size={16} />
          {pending
            ? isEdit ? "Saving..." : "Uploading..."
            : isEdit ? "Save Changes" : "Upload Property"
          }
        </button>
        <a
          href="/admin/properties"
          className="px-6 py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-xl text-sm transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
