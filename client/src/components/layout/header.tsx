import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Dell Logo */}
          <div className="flex items-center">
            <Link href="/" data-testid="link-home">
              <div className="text-2xl font-bold dell-blue cursor-pointer">DELL</div>
            </Link>
          </div>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-primary font-medium"
                  data-testid="button-laptops-menu"
                >
                  Laptops <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem asChild>
                  <Link href="/category/premium" data-testid="link-xps-series">
                    XPS Series
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/everyday" data-testid="link-inspiron-series">
                    Inspiron Series
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/business" data-testid="link-latitude-series">
                    Latitude Series
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/gaming" data-testid="link-gaming-laptops">
                    Gaming Laptops
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-primary font-medium"
                  data-testid="button-business-menu"
                >
                  Business <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/category/workstation" data-testid="link-workstations">
                    Workstations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/enterprise" data-testid="link-enterprise">
                    Enterprise Solutions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/small-business" data-testid="link-small-business">
                    Small Business
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/support" data-testid="link-support">
              <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
                Support
              </Button>
            </Link>
            <Link href="/services" data-testid="link-services">
              <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
                Services
              </Button>
            </Link>
          </nav>
          
          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Search laptops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
                data-testid="input-search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </form>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge 
                variant="default" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
