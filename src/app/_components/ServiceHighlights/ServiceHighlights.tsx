
import {
  Truck,
  ShieldCheck,
  PackageCheck,
  RotateCcw,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Delivery Options",
    description: "Shipping details available at checkout",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "A smooth and secure payment experience",
  },
  {
    icon: PackageCheck,
    title: "Curated Selection",
    description: "Products selected with care",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "14-day return policy for peace of mind",
  },
];

export default function ServiceHighlights() {
  return (
    <section
      aria-label="Shopping benefits"
      className="bg-background  px-4 py-10 sm:px-7 sm:py-12 lg:px-12 lg:py-14"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#E4DCD3] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {services.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group flex items-center gap-5 px-3 py-6 first:pt-0 last:pb-0 sm:px-5 sm:py-6 sm:first:pt-6 sm:last:pb-6 lg:gap-4 lg:px-5 xl:gap-5 xl:px-6"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-[#D4AF37]/50 bg-card  transition-colors duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 sm:h-16 sm:w-16">
              <Icon
                size={25}
                strokeWidth={1.4}
                className="text-[#B89625] transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground  sm:text-[11px] xl:text-xs">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#82776F]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
