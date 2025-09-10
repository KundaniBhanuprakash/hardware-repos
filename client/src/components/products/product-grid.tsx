import { type Laptop } from "@shared/schema";
import ProductCard from "./product-card";

interface ProductGridProps {
  laptops: Laptop[];
  isLoading?: boolean;
  onAddToCart?: (laptop: Laptop) => void;
}

export default function ProductGrid({ laptops, isLoading, onAddToCart }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-xl h-64 mb-4"></div>
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded w-3/4"></div>
              <div className="bg-muted h-4 rounded w-1/2"></div>
              <div className="bg-muted h-8 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (laptops.length === 0) {
    return (
      <div className="text-center py-12" data-testid="empty-state-products">
        <h3 className="text-lg font-semibold text-foreground mb-2">No laptops found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-products">
      {laptops.map((laptop) => (
        <ProductCard
          key={laptop.id}
          laptop={laptop}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
