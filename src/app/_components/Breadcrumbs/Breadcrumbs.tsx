import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({items}: {items: { label: string; href?: string }[];}) {


  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        aria-label="Home"
        className="text-foreground transition-colors dark:hover:text-yellow-500 hover:text-black"
      >
        <Home size={16} strokeWidth={1.7} />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            <ChevronRight
              size={14}
              className="text-foreground"
              aria-hidden="true"
            />

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-foreground transition-colors dark:hover:text-yellow-500 hover:text-black"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "font-medium text-foreground" : "text-foreground"}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}