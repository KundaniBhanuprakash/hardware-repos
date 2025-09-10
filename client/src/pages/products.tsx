import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type Laptop } from "@shared/schema";
import ProductGrid from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, X } from "lucide-react";

export default function Products() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    series: "",
    inStock: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Parse URL params
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  // Build query params
  const queryParams = new URLSearchParams();
  if (searchQuery) queryParams.set('search', searchQuery);
  if (filters.category) queryParams.set('category', filters.category);
  if (filters.minPrice) queryParams.set('minPrice', filters.minPrice);
  if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);
  if (filters.series) queryParams.set('series', filters.series);
  if (filters.inStock) queryParams.set('inStock', 'true');

  const { data: laptops, isLoading } = useQuery<Laptop[]>({
    queryKey: ["/api/laptops", queryParams.toString()],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    setLocation(`/products${params.toString() ? '?' + params.toString() : ''}`);
  };

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

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      series: "",
      inStock: false,
    });
    setSearchQuery("");
    setLocation('/products');
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Dell Laptops</h1>
          <p className="text-xl text-muted-foreground">
            Discover our complete collection of premium laptops for every need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search laptops by name, series, or specifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-products"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </form>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
              data-testid="button-toggle-filters"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {filters.category}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, category: "" }))} />
                </Badge>
              )}
              {filters.series && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Series: {filters.series}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, series: "" }))} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} data-testid="button-clear-filters">
                Clear all
              </Button>
            </div>
          )}

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filter Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => setFilters(f => ({ ...f, category: value }))}
                    >
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="Everyday">Everyday</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Series</label>
                    <Select
                      value={filters.series}
                      onValueChange={(value) => setFilters(f => ({ ...f, series: value }))}
                    >
                      <SelectTrigger data-testid="select-series">
                        <SelectValue placeholder="All Series" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Series</SelectItem>
                        <SelectItem value="XPS">XPS Series</SelectItem>
                        <SelectItem value="Inspiron">Inspiron Series</SelectItem>
                        <SelectItem value="Latitude">Latitude Series</SelectItem>
                        <SelectItem value="G Series">G Series Gaming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => setFilters(f => ({ ...f, minPrice: e.target.value }))}
                        data-testid="input-min-price"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
                        data-testid="input-max-price"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Availability</label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inStock"
                        checked={filters.inStock}
                        onCheckedChange={(checked) => setFilters(f => ({ ...f, inStock: checked as boolean }))}
                        data-testid="checkbox-in-stock"
                      />
                      <label htmlFor="inStock" className="text-sm">In Stock Only</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {isLoading ? "Loading..." : `${laptops?.length || 0} laptops found`}
            </p>
            <Select>
              <SelectTrigger className="w-48" data-testid="select-sort-products">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
