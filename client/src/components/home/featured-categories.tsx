import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeaturedCategories() {
  const categories = [
    {
      id: "business",
      title: "Business & Professional",
      description: "Reliable laptops built for productivity and performance in professional environments.",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      link: "/category/business",
      linkText: "Explore Business Laptops"
    },
    {
      id: "student",
      title: "Student & Education",
      description: "Affordable and durable laptops perfect for students and educational institutions.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      link: "/category/student",
      linkText: "Shop Student Laptops"
    },
    {
      id: "gaming",
      title: "Gaming & Creative",
      description: "High-performance laptops designed for gaming, content creation, and demanding applications.",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      link: "/category/gaming",
      linkText: "Discover Gaming Laptops"
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect laptop for your needs, whether you're a professional, student, or gamer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="grid-categories">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-testid={`card-category-${category.id}`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover"
                data-testid={`img-category-${category.id}`}
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2" data-testid={`title-category-${category.id}`}>
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`description-category-${category.id}`}>
                  {category.description}
                </p>
                <Link href={category.link}>
                  <Button 
                    variant="ghost" 
                    className="text-primary font-semibold hover:underline p-0"
                    data-testid={`link-category-${category.id}`}
                  >
                    {category.linkText} →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
