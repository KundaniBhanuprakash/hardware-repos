import { Award, Shield, Headphones, Leaf } from "lucide-react";

export default function WhyChooseDell() {
  const features = [
    {
      icon: Award,
      title: "Award-Winning Design",
      description: "Recognized globally for innovative design and engineering excellence."
    },
    {
      icon: Shield,
      title: "Reliable Performance",
      description: "Built to last with rigorous testing and quality assurance processes."
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 customer support and comprehensive warranty coverage."
    },
    {
      icon: Leaf,
      title: "Sustainable Technology",
      description: "Committed to environmental responsibility and sustainable practices."
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Dell Laptops?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the Dell difference with our commitment to innovation, reliability, and customer satisfaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="grid-features">
          {features.map((feature, index) => (
            <div key={index} className="text-center" data-testid={`feature-${index}`}>
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" data-testid={`title-feature-${index}`}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground" data-testid={`description-feature-${index}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
