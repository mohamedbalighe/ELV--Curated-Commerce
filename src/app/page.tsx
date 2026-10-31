import Image from "next/image";
import FeaturedProduct from "./_components/FeaturedProduct/FeaturedProduct";
import img1 from "../assets/images/Casual_Men_Clothes_atElve_store_Gemini_Generated_Image_vts8mmvts8mmvts8.jpg"
import img2 from "../assets/images/Casual_Women_Clothes_at_Elve_store_Gemini_Generated_Image_bt2gc5bt2gc5bt2g.jpg"
import img3 from "../assets/images/electronics_Store_ByElveGemini_Generated_Image_fjut44fjut44fjut.jpg"
import HomeHero from './_components/HomeHero/HomeHero';
import dynamic from "next/dynamic";
import ServiceHighlights from "./_components/ServiceHighlights/ServiceHighlights";
import { getShopCategories } from "./_components/Api/actions/catogeryApi";


const ShopCategory= dynamic(() => import('./Categories/page'),{
  loading:()=> <div className="bg-gray-200 text-center font-bold"> Loading..</div>
});

export default async function Home() {
    const categories = await getShopCategories();

  return <>
    <HomeHero
PageList={[img1.src, img2.src, img3.src]}
 categories={ categories.map((category) => ({id: category._id , name: category.name,})) }
/>
<ServiceHighlights/>

    <ShopCategory/>
   <FeaturedProduct/>
   <ServiceHighlights/>

</>
}