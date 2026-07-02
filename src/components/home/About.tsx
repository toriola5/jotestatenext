import Image from "next/image";
import {
  CheckCircle,
  Award,
  Users,
  Building2,
  Scale,
  BadgeCheck,
  CalendarDays,
} from "lucide-react";

const highlights = [
  "100+ satisfied clients across Nigeria",
  "Led by a two-time ERCAAN Mainland Zone Chairman",
  "Comprehensive expertise across all property types",
  "Dedicated legal advisory for safe transactions",
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid: image + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative" data-animate="left">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/house.jpg"
                alt="Jola Estates property"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[var(--primary)] text-white rounded-2xl p-6 shadow-xl">
              <p className="text-3xl font-bold">10+</p>
              <p className="text-sm mt-1 opacity-90">Years of Experience</p>
            </div>
          </div>

          <div data-animate="right">
            <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
              About Us
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Nigeria&apos;s Most Trusted Real Estate Agency
            </h2>
            <div className="w-10 h-1 bg-[var(--primary)] rounded-full mb-4" />
            <p className="text-gray-600 mb-4 leading-relaxed">
              <strong>J.ola Toriola Real Estate Agency</strong>
              is built on a solid reputation for delivering trusted,
              transparent, and client-focused real estate services. While we
              primarily operate in Lagos State, our expertise extends nationwide
              to serve clients across Nigeria.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Led by <strong>Hon. Jayeola Toriola</strong>, a two-time Chairman
              of Estate Rent And Commission Agents Association of Nigeria
              (ERCAAN) Mainland Zone, Lagos — our firm is built on a foundation
              of professionalism, industry leadership, and a commitment to
              ethical real estate practice in Nigeria.
            </p>

            <ul className="space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle
                    size={17}
                    className="text-[var(--primary)] shrink-0 mt-0.5"
                  />
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: detailed content cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 border-t border-gray-100"
          data-animate="up"
        >
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
              <Building2 size={20} className="text-[var(--primary)]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
              Comprehensive Expertise
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Full-spectrum expertise across residential, commercial,
              industrial, and mixed-use developments — from land acquisition and
              property development to investment advisory and property
              management.
            </p>
          </div>

          <div className="bg-[var(--primary)] rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2 text-sm">
              Who We Serve
            </h3>
            <p className="text-red-100 text-sm leading-relaxed">
              We serve private individuals, investors, developers, and
              institutions with tailored real estate solutions that meet both
              immediate needs and long-term goals.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
              <Scale size={20} className="text-[var(--primary)]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
              Legal Advisory
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dedicated legal advisory services supporting safe, compliant, and
              well-documented transactions — covering land titles, ownership,
              zoning regulations, and contract agreements.
            </p>
          </div>

          <div className="bg-[var(--primary)] rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <Award size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2 text-sm">
              Our Mission
            </h3>
            <p className="text-red-100 text-sm leading-relaxed">
              Driven by integrity, innovation, and excellence — our mission is
              to make real estate accessible, secure, and rewarding for every
              client we serve.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
              <BadgeCheck size={20} className="text-[var(--primary)]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">
              Registration Number
            </h3>
            <p className="text-2xl font-bold text-[var(--primary)] mb-2">
              CRBN 332307
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Fully registered and licensed property firm operating under
              Nigerian real estate regulations.
            </p>
          </div>

          <div className="bg-[var(--primary)] rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <CalendarDays size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1 text-sm">
              Year Established
            </h3>
            <p className="text-2xl font-bold text-white mb-2">2014</p>
            <p className="text-red-100 text-sm leading-relaxed">
              Over a decade of trusted real estate service, completing numerous
              successful transactions across Nigeria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
