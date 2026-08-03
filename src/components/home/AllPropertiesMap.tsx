"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { type LatLngBoundsExpression } from "leaflet";
import { formatPrice } from "@/lib/utils";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type MappableProperty = {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  address: string;
  images: string[];
  latitude: number;
  longitude: number;
};

type Props = {
  properties: MappableProperty[];
};

export default function AllPropertiesMap({ properties }: Props) {
  const bounds: LatLngBoundsExpression = properties.map((p) => [
    p.latitude,
    p.longitude,
  ]);

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [40, 40] }}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%", borderRadius: "16px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude, property.longitude]}
          icon={markerIcon}
        >
          <Popup>
            <Link href={`/listings/${property.id}`} className="block w-40">
              {property.images?.[0] && (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-20 object-cover rounded-md mb-1.5"
                />
              )}
              <strong className="text-sm text-gray-900">
                {property.title}
              </strong>
              <br />
              <span className="text-xs text-gray-500">
                {property.city}, {property.state}
              </span>
              <br />
              <span className="text-xs font-semibold text-[var(--primary)]">
                {formatPrice(property.price)}
              </span>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
