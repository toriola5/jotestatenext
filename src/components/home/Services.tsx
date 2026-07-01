import { Home, LineChart, Building2, Settings, Map, FileText } from "lucide-react";

const WHATSAPP_NUMBER = "2348023388329";

function whatsappLink(service: string) {
  const msg = `Hello, I'm interested in your *${service}* service. Please provide more details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const services = [
  {
    icon: Home,
    title: "Property Sales / Purchase",
    description:
      "With years of experience identifying properties with strong growth potential, we specialise in acquiring real estate at the right price. Whether buying, selling, or evaluating a property, our team provides expert guidance, market insights, and end-to-end support.",
  },
  {
    icon: LineChart,
    title: "Real Estate Consulting",
    description:
      "Our consultancy service provides expert guidance at every stage of your real estate journey. Whether buying, selling, investing, or developing property, we offer tailored advice based on in-depth market knowledge to help you make informed decisions and maximise investment value.",
  },
  {
    icon: Building2,
    title: "Property Development",
    description:
      "We offer tailored advice specific to each location and work alongside you to ensure development aligns with your vision and goals. Whether it's planning, layout, property development, or renovation, we guide and support you every step of the way.",
  },
  {
    icon: Settings,
    title: "Property Management",
    description:
      "Our Property Management service takes the stress out of owning property. We handle everything — from tenant communication and rent collection to maintenance and inspections — so you can enjoy the benefits of ownership without the hassle.",
  },
  {
    icon: Map,
    title: "Land Survey",
    description:
      "Our licensed surveyors use modern equipment to handle boundary surveys, topographic mapping, construction layout, and subdivision planning. We help with title verification and cadastral surveys, making it easier to obtain your Certificate of Occupancy (C of O).",
  },
  {
    icon: FileText,
    title: "Lease Agreement & Documentation",
    description:
      "We simplify lease agreements by providing expert negotiation and documentation services that protect your interests. From rent structures and maintenance responsibilities to renewal options and dispute resolution, we handle every detail to avoid costly misunderstandings.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
            What We Offer
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            End-to-end real estate services tailored to meet every property need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
                <Icon size={22} className="text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>
              <a
                href={whatsappLink(title)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:text-[#20bb5a] transition-colors"
              >
                <WhatsAppIcon />
                Enquire on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
