import { useQuery } from "@tanstack/react-query";
import { type Laptop } from "@shared/schema";
import HeroSection from "@/components/home/hero-section";
import FeaturedCategories from "@/components/home/featured-categories";
import WhyChooseDell from "@/components/home/why-choose-dell";
import Newsletter from "@/components/home/newsletter";
import ProductGrid from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function Home() {
  const { data: featuredLaptops, isLoading } = useQuery<Laptop[]>({
    queryKey: ["/api/laptops/featured"],
  });

  const handleAddToCart = async (laptop: Laptop) => {
    // Generate a session ID if not exists
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        laptopId: laptop.id,
        quantity: 1,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }
  };

  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      
      {/* Product Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Featured Laptops</h2>
              <p className="text-xl text-muted-foreground">Discover our most popular and highly-rated laptop models.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select>
                <SelectTrigger className="w-48" data-testid="select-sort">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="popularity">Sort by Popularity</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" data-testid="button-filter">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ProductGrid 
            laptops={featuredLaptops || []} 
            isLoading={isLoading}
            onAddToCart={handleAddToCart}
          />
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" data-testid="button-view-all-laptops">
                View All Laptops
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseDell />
      <Newsletter />
    </div>
  );
}
