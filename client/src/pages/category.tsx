import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Laptop } from "@shared/schema";
import ProductGrid from "@/components/products/product-grid";

export default function Category() {
  const { category } = useParams<{ category: string }>();

  const { data: laptops, isLoading } = useQuery<Laptop[]>({
    queryKey: ["/api/categories", category, "laptops"],
  });

  const handleAddToCart = async (laptop: Laptop) => {
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

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      premium: "Premium Laptops",
      business: "Business Laptops",
      gaming: "Gaming Laptops",
      everyday: "Everyday Laptops",
      student: "Student Laptops",
      workstation: "Workstations",
      enterprise: "Enterprise Solutions",
      "small-business": "Small Business Laptops"
    };
    return titles[cat] || `${cat.charAt(0).toUpperCase() + cat.slice(1)} Laptops`;
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      premium: "Experience the pinnacle of laptop technology with our premium XPS series.",
      business: "Professional laptops built for productivity and reliability in corporate environments.",
      gaming: "High-performance gaming laptops designed for immersive gaming experiences.",
      everyday: "Reliable and affordable laptops perfect for daily computing needs.",
      student: "Budget-friendly laptops designed specifically for students and educational use.",
      workstation: "Powerful workstations for demanding professional applications and workflows.",
      enterprise: "Enterprise-grade solutions for large organizations and businesses.",
      "small-business": "Perfect laptops for small business owners and entrepreneurs."
    };
    return descriptions[cat] || `Discover our ${cat} laptop collection.`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="title-category">
            {getCategoryTitle(category!)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl" data-testid="description-category">
            {getCategoryDescription(category!)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-muted-foreground">
            {isLoading ? "Loading..." : `${laptops?.length || 0} laptops in this category`}
          </p>
        </div>

        <ProductGrid 
          laptops={laptops || []} 
          isLoading={isLoading}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
