import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-dell-navy-bg text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated with Dell</h2>
        <p className="text-xl mb-8 text-blue-100">
          Get the latest news, product updates, and exclusive offers delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-gray-800"
            required
            data-testid="input-newsletter-email"
          />
          <Button
            type="submit"
            disabled={isSubscribing}
            className="bg-white text-primary hover:bg-blue-50 font-semibold"
            data-testid="button-newsletter-subscribe"
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="text-sm text-blue-200 mt-4">
          By subscribing, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </section>
  );
}
