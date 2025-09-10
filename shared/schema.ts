import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const laptops = pgTable("laptops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  series: text("series").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("4.0"),
  reviewCount: integer("review_count").default(0),
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").default(true),
  isFeatured: boolean("is_featured").default(false),
  isPopular: boolean("is_popular").default(false),
  badge: text("badge"), // "Best Seller", "Great Value", "Gaming", etc.
  specifications: jsonb("specifications").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  laptopId: varchar("laptop_id").references(() => laptops.id).notNull(),
  quantity: integer("quantity").default(1),
  userId: varchar("user_id"), // For session-based cart, can be null
  sessionId: text("session_id"), // For anonymous users
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLaptopSchema = createInsertSchema(laptops).omit({
  id: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLaptop = z.infer<typeof insertLaptopSchema>;
export type Laptop = typeof laptops.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
