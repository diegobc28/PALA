import { Suspense } from "react";
import Header from "@/components/Header";
import HeroMarketplace from "@/components/HeroMarketplace";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoriesExplore from "@/components/CategoriesExplore";
import RecentlyAdded from "@/components/RecentlyAdded";
import VendorCTA from "@/components/VendorCTA";
import FeaturedCategory from "@/components/FeaturedCategory";
import NewCompanies from "@/components/NewCompanies";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <HeroMarketplace />
        <FeaturedProducts />
        <CategoriesExplore />
        <RecentlyAdded />
        <VendorCTA />
        <FeaturedCategory />
        <NewCompanies />
        <BlogSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
