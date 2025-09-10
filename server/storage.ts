import { type User, type InsertUser, type Laptop, type InsertLaptop, type CartItem, type InsertCartItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Laptop methods
  getLaptops(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    series?: string;
    inStock?: boolean;
    featured?: boolean;
  }): Promise<Laptop[]>;
  getLaptop(id: string): Promise<Laptop | undefined>;
  searchLaptops(query: string): Promise<Laptop[]>;
  getFeaturedLaptops(): Promise<Laptop[]>;
  getLaptopsByCategory(category: string): Promise<Laptop[]>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<(CartItem & { laptop: Laptop })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private laptops: Map<string, Laptop>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.users = new Map();
    this.laptops = new Map();
    this.cartItems = new Map();
    this.initializeLaptops();
  }

  private initializeLaptops() {
    const sampleLaptops: Laptop[] = [
      {
        id: "1",
        name: "Dell XPS 13 9320",
        series: "XPS Series",
        description: "13.4\" InfinityEdge Display, Intel Core i7, 16GB RAM, 512GB SSD",
        price: "1299.00",
        originalPrice: "1499.00",
        category: "Premium",
        rating: "4.8",
        reviewCount: 247,
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
        isFeatured: true,
        isPopular: true,
        badge: "Best Seller",
        specifications: {
          processor: "Intel Core i7-1250U",
          memory: "16GB LPDDR5",
          storage: "512GB PCIe NVMe SSD",
          display: "13.4\" FHD+ InfinityEdge",
          graphics: "Intel Iris Xe",
          battery: "Up to 12 hours",
          weight: "2.64 lbs"
        },
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Dell Inspiron 15 3000",
        series: "Inspiron Series",
        description: "15.6\" HD Display, Intel Core i5, 8GB RAM, 256GB SSD",
        price: "649.00",
        originalPrice: null,
        category: "Everyday",
        rating: "4.3",
        reviewCount: 156,
        imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        inStock: true,
        isFeatured: true,
        isPopular: false,
        badge: "Great Value",
        specifications: {
          processor: "Intel Core i5-1135G7",
          memory: "8GB DDR4",
          storage: "256GB PCIe NVMe SSD",
          display: "15.6\" HD Anti-Glare",
          graphics: "Intel Iris Xe",
          battery: "Up to 7 hours",
          weight: "3.8 lbs"
        },
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Dell G15 Gaming Laptop",
        series: "G Series Gaming",
        description: "15.6\" FHD 120Hz, AMD Ryzen 7, 16GB RAM, RTX 3060, 512GB SSD",
        price: "1099.00",
        originalPrice: "1299.00",
        category: "Gaming",
        rating: "4.7",
        reviewCount: 89,
        imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        inStock: true,
        isFeatured: true,
        isPopular: false,
        badge: "Gaming",
        specifications: {
          processor: "AMD Ryzen 7 5800H",
          memory: "16GB DDR4",
          storage: "512GB PCIe NVMe SSD",
          display: "15.6\" FHD 120Hz",
          graphics: "NVIDIA GeForce RTX 3060",
          battery: "Up to 6 hours",
          weight: "5.4 lbs"
        },
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "Dell Latitude 7420",
        series: "Latitude Series",
        description: "14\" FHD Display, Intel Core i7, 16GB RAM, 512GB SSD, Business Class",
        price: "1449.00",
        originalPrice: null,
        category: "Business",
        rating: "4.6",
        reviewCount: 124,
        imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        inStock: true,
        isFeatured: false,
        isPopular: true,
        badge: "Business Choice",
        specifications: {
          processor: "Intel Core i7-1185G7",
          memory: "16GB LPDDR4x",
          storage: "512GB PCIe NVMe SSD",
          display: "14\" FHD Anti-Glare",
          graphics: "Intel Iris Xe",
          battery: "Up to 15 hours",
          weight: "3.0 lbs"
        },
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "Dell XPS 15 9520",
        series: "XPS Series",
        description: "15.6\" 3.5K OLED Display, Intel Core i9, 32GB RAM, 1TB SSD",
        price: "2299.00",
        originalPrice: "2599.00",
        category: "Premium",
        rating: "4.9",
        reviewCount: 73,
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
        isFeatured: false,
        isPopular: true,
        badge: "Premium",
        specifications: {
          processor: "Intel Core i9-12900HK",
          memory: "32GB DDR5",
          storage: "1TB PCIe NVMe SSD",
          display: "15.6\" 3.5K OLED Touch",
          graphics: "NVIDIA GeForce RTX 3050 Ti",
          battery: "Up to 8 hours",
          weight: "4.2 lbs"
        },
        createdAt: new Date(),
      },
      {
        id: "6",
        name: "Dell Inspiron 14 5000",
        series: "Inspiron Series",
        description: "14\" FHD Display, AMD Ryzen 5, 8GB RAM, 256GB SSD",
        price: "579.00",
        originalPrice: null,
        category: "Student",
        rating: "4.4",
        reviewCount: 203,
        imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        inStock: true,
        isFeatured: false,
        isPopular: false,
        badge: "Student Choice",
        specifications: {
          processor: "AMD Ryzen 5 5500U",
          memory: "8GB DDR4",
          storage: "256GB PCIe NVMe SSD",
          display: "14\" FHD Anti-Glare",
          graphics: "AMD Radeon",
          battery: "Up to 8 hours",
          weight: "3.4 lbs"
        },
        createdAt: new Date(),
      }
    ];

    sampleLaptops.forEach(laptop => {
      this.laptops.set(laptop.id, laptop);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Laptop methods
  async getLaptops(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    series?: string;
    inStock?: boolean;
    featured?: boolean;
  }): Promise<Laptop[]> {
    let laptops = Array.from(this.laptops.values());

    if (filters) {
      if (filters.category) {
        laptops = laptops.filter(laptop => laptop.category.toLowerCase() === filters.category!.toLowerCase());
      }
      if (filters.series) {
        laptops = laptops.filter(laptop => laptop.series.toLowerCase().includes(filters.series!.toLowerCase()));
      }
      if (filters.inStock !== undefined) {
        laptops = laptops.filter(laptop => laptop.inStock === filters.inStock);
      }
      if (filters.featured !== undefined) {
        laptops = laptops.filter(laptop => laptop.isFeatured === filters.featured);
      }
      if (filters.minPrice !== undefined) {
        laptops = laptops.filter(laptop => parseFloat(laptop.price) >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        laptops = laptops.filter(laptop => parseFloat(laptop.price) <= filters.maxPrice!);
      }
    }

    return laptops.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getLaptop(id: string): Promise<Laptop | undefined> {
    return this.laptops.get(id);
  }

  async searchLaptops(query: string): Promise<Laptop[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.laptops.values()).filter(laptop =>
      laptop.name.toLowerCase().includes(searchTerm) ||
      laptop.description.toLowerCase().includes(searchTerm) ||
      laptop.series.toLowerCase().includes(searchTerm) ||
      laptop.category.toLowerCase().includes(searchTerm)
    );
  }

  async getFeaturedLaptops(): Promise<Laptop[]> {
    return Array.from(this.laptops.values()).filter(laptop => laptop.isFeatured);
  }

  async getLaptopsByCategory(category: string): Promise<Laptop[]> {
    return Array.from(this.laptops.values()).filter(laptop => 
      laptop.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<(CartItem & { laptop: Laptop })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    const itemsWithLaptops: (CartItem & { laptop: Laptop })[] = [];
    
    for (const item of items) {
      const laptop = await this.getLaptop(item.laptopId);
      if (laptop) {
        itemsWithLaptops.push({ ...item, laptop });
      }
    }
    
    return itemsWithLaptops;
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const item: CartItem = { 
      ...insertItem, 
      id,
      createdAt: new Date()
    };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = Array.from(this.cartItems.entries()).filter(([_, item]) => item.sessionId === sessionId);
    items.forEach(([id]) => this.cartItems.delete(id));
    return true;
  }
}

export const storage = new MemStorage();
