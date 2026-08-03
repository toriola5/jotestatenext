"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/home/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
      Loading map…
    </div>
  ),
});

type Props = {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
};

export default function PropertyMapWrapper(props: Props) {
  return <PropertyMap {...props} />;
}
