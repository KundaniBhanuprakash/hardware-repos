import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { type Laptop } from "@shared/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  laptop: Laptop;
  onAddToCart?: (laptop: Laptop) => void;
}

export default function ProductCard({ laptop, onAddToCart }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      if (onAddToCart) {
        await onAddToCart(laptop);
      }
      toast({
        title: "Added to cart",
        description: `${laptop.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderStars = (rating: string) => {
    const ratingNumber = parseFloat(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3 w-3 ${
            i <= ratingNumber ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="product-card overflow-hidden border border-border" data-testid={`card-product-${laptop.id}`}>
      <div className="relative">
        <img
          src={laptop.imageUrl}
          alt={laptop.name}
          className="w-full h-64 object-cover"
          data-testid={`img-product-${laptop.id}`}
        />
        {laptop.badge && (
          <Badge 
            variant="default" 
            className="absolute top-4 left-4"
            data-testid={`badge-${laptop.id}`}
          >
            {laptop.badge}
          </Badge>
        )}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-white shadow-md hover:bg-gray-50"
          data-testid={`button-favorite-${laptop.id}`}
        >
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
        </Button>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground font-medium" data-testid={`text-series-${laptop.id}`}>
            {laptop.series}
          </span>
          <div className="flex items-center">
            <div className="flex">
              {renderStars(laptop.rating)}
            </div>
            <span className="text-sm text-muted-foreground ml-1" data-testid={`text-rating-${laptop.id}`}>
              ({laptop.rating})
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2" data-testid={`text-name-${laptop.id}`}>
          {laptop.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4" data-testid={`text-description-${laptop.id}`}>
          {laptop.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-foreground" data-testid={`text-price-${laptop.id}`}>
              ${laptop.price}
            </span>
            {laptop.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through ml-2" data-testid={`text-original-price-${laptop.id}`}>
                  ${laptop.originalPrice}
                </span>
                <span className="text-green-600 text-sm font-semibold ml-2" data-testid={`text-savings-${laptop.id}`}>
                  Save ${(parseFloat(laptop.originalPrice) - parseFloat(laptop.price)).toFixed(0)}
                </span>
              </>
            )}
          </div>
          {laptop.inStock ? (
            <span className="text-blue-600 text-sm font-semibold" data-testid={`text-stock-${laptop.id}`}>
              In Stock
            </span>
          ) : (
            <span className="text-red-600 text-sm font-semibold" data-testid={`text-out-of-stock-${laptop.id}`}>
              Out of Stock
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={!laptop.inStock || isAddingToCart}
            data-testid={`button-add-cart-${laptop.id}`}
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
          <Link href={`/products/${laptop.id}`}>
            <Button 
              variant="outline" 
              className="w-full"
              data-testid={`button-view-details-${laptop.id}`}
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
