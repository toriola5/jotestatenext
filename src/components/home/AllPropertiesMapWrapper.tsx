"use client";

import dynamic from "next/dynamic";

const AllPropertiesMap = dynamic(
  () => import("@/components/home/AllPropertiesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Loading map…
      </div>
    ),
  },
);

type Props = {
  properties: {
    id: string;
    title: string;
    price: number;
    city: string;
    state: string;
    address: string;
    images: string[];
    latitude: number;
    longitude: number;
  }[];
};

export default function AllPropertiesMapWrapper(props: Props) {
  return <AllPropertiesMap {...props} />;
}
