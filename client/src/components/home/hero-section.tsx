import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary to-dell-navy-bg text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Power Your <span className="text-blue-200">Potential</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Discover Dell's latest collection of premium laptops designed for professionals, creators, and innovators. Experience unmatched performance and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-lg"
                  data-testid="button-shop-now"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/products">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
                  data-testid="button-view-catalog"
                >
                  View Catalog
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Modern Dell laptop on a clean desk"
              className="rounded-xl shadow-2xl w-full h-auto transform rotate-3 hover:rotate-0 transition-transform duration-500"
              data-testid="img-hero-laptop"
            />
            <div className="absolute -bottom-4 -left-4 bg-white text-primary p-4 rounded-lg shadow-lg">
              <div className="text-sm font-semibold">Starting at</div>
              <div className="text-2xl font-bold">$899</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
