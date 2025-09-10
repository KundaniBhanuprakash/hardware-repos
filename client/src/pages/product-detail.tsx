import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Laptop } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Heart, ShoppingCart, Shield, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const { data: laptop, isLoading } = useQuery<Laptop>({
    queryKey: ["/api/laptops", id],
  });

  const handleAddToCart = async () => {
    if (!laptop) return;
    
    setIsAddingToCart(true);
    try {
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
          className={`h-4 w-4 ${
            i <= ratingNumber ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-muted rounded-xl h-96"></div>
              <div className="space-y-4">
                <div className="bg-muted h-8 rounded w-3/4"></div>
                <div className="bg-muted h-4 rounded w-1/2"></div>
                <div className="bg-muted h-12 rounded"></div>
                <div className="bg-muted h-8 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The laptop you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={laptop.imageUrl}
              alt={laptop.name}
              className="w-full h-96 lg:h-full object-cover rounded-xl"
              data-testid="img-product-detail"
            />
            {laptop.badge && (
              <Badge className="absolute top-4 left-4" data-testid="badge-product-detail">
                {laptop.badge}
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground font-medium" data-testid="text-series-detail">
                {laptop.series}
              </span>
              <div className="flex items-center mt-1">
                <div className="flex">{renderStars(laptop.rating)}</div>
                <span className="text-sm text-muted-foreground ml-2" data-testid="text-rating-detail">
                  ({laptop.rating}) • {laptop.reviewCount} reviews
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-name-detail">
              {laptop.name}
            </h1>

            <p className="text-lg text-muted-foreground mb-6" data-testid="text-description-detail">
              {laptop.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-foreground" data-testid="text-price-detail">
                  ${laptop.price}
                </span>
                {laptop.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through" data-testid="text-original-price-detail">
                      ${laptop.originalPrice}
                    </span>
                    <Badge variant="destructive" data-testid="text-savings-detail">
                      Save ${(parseFloat(laptop.originalPrice) - parseFloat(laptop.price)).toFixed(0)}
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Free shipping on orders over $500</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {laptop.inStock ? (
                <Badge variant="secondary" className="text-green-600" data-testid="text-stock-detail">
                  ✓ In Stock - Ships within 2-3 business days
                </Badge>
              ) : (
                <Badge variant="destructive" data-testid="text-out-of-stock-detail">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4 mb-8">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!laptop.inStock || isAddingToCart}
                data-testid="button-add-cart-detail"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
              </Button>
              
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1" data-testid="button-favorite-detail">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="lg" className="flex-1" data-testid="button-compare-detail">
                  Compare
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">3-Year Warranty</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="specs-grid">
              {Object.entries(laptop.specifications as Record<string, string>).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
