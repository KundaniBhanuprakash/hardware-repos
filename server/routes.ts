import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all laptops with optional filters
  app.get("/api/laptops", async (req, res) => {
    try {
      const { category, minPrice, maxPrice, series, inStock, featured, search } = req.query;
      
      if (search) {
        const laptops = await storage.searchLaptops(search as string);
        res.json(laptops);
        return;
      }

      const filters: any = {};
      if (category) filters.category = category as string;
      if (minPrice) filters.minPrice = parseFloat(minPrice as string);
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice as string);
      if (series) filters.series = series as string;
      if (inStock !== undefined) filters.inStock = inStock === 'true';
      if (featured !== undefined) filters.featured = featured === 'true';

      const laptops = await storage.getLaptops(Object.keys(filters).length > 0 ? filters : undefined);
      res.json(laptops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch laptops" });
    }
  });

  // Get featured laptops
  app.get("/api/laptops/featured", async (req, res) => {
    try {
      const laptops = await storage.getFeaturedLaptops();
      res.json(laptops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured laptops" });
    }
  });

  // Get laptop by ID
  app.get("/api/laptops/:id", async (req, res) => {
    try {
      const laptop = await storage.getLaptop(req.params.id);
      if (!laptop) {
        return res.status(404).json({ message: "Laptop not found" });
      }
      res.json(laptop);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch laptop" });
    }
  });

  // Get laptops by category
  app.get("/api/categories/:category/laptops", async (req, res) => {
    try {
      const laptops = await storage.getLaptopsByCategory(req.params.category);
      res.json(laptops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch laptops for category" });
    }
  });

  // Cart routes
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const items = await storage.getCartItems(req.params.sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const item = await storage.addToCart(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const item = await storage.updateCartItem(req.params.id, quantity);
      if (!item) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      await storage.clearCart(req.params.sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
