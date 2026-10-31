import { getSpecificCategory } from "@/app/_components/Api/actions/catogeryApi";
import FeaturedProduct from "@/app/_components/FeaturedProduct/FeaturedProduct";
import ServiceHighlights from "@/app/_components/ServiceHighlights/ServiceHighlights";
import Link from "next/link";

export default async function CategoryPage({params,}: {params: Promise<{ id: string }>;}) {
  const { id } = await params;

  const Categorie_Id = await getSpecificCategory(id);

  console.log("Specific Category:", Categorie_Id);

  if (!Categorie_Id) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Category not found
        </h2>

        <p className="mt-3 text-sm text-neutral-500">
          We couldn't find this Categorie.
        </p>

        <Link
          href="/"
          className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return <>
  <FeaturedProduct categoryId={id}   categoryName={Categorie_Id.name}
 />
        <ServiceHighlights/>

  </>
  ;
}