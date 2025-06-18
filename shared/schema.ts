import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const radioStations = pgTable("radio_stations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  frequency: text("frequency"),
  description: text("description"),
  streamUrl: text("stream_url").notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
  genre: text("genre"),
  location: text("location"),
  isActive: boolean("is_active").default(true),
  gradientFrom: text("gradient_from").notNull(),
  gradientTo: text("gradient_to").notNull(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  stationId: integer("station_id").references(() => radioStations.id),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRadioStationSchema = createInsertSchema(radioStations).omit({
  id: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export type RadioStation = typeof radioStations.$inferSelect;
export type InsertRadioStation = z.infer<typeof insertRadioStationSchema>;
export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
