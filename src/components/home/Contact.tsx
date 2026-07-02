import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div data-animate="left">
            <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
              Contact Us
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Get In Touch
            </h2>
            <div className="w-10 h-1 bg-[var(--primary)] rounded-full mb-4" />
            <p className="text-gray-500 mb-8 leading-relaxed">
              Ready to find your dream property? Our team is here to help you
              every step of the way.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "41, Commercial Avenue, Sabo Yaba, Lagos, Nigeria",
                },
                { icon: Phone, label: "Phone", value: "+234 8023388329" },
                {
                  icon: Mail,
                  label: "Email",
                  value: "jolatoriolaestate4u@gmail.com",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                    <Icon size={18} className="text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-gray-700 font-medium text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden min-h-[560px]"
            data-animate="right"
          >
            <Image
              src="/contact.jpg"
              alt="Contact Jola Estates"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
