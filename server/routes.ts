import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFavoriteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all radio stations
  app.get("/api/stations", async (req, res) => {
    try {
      const stations = await storage.getAllStations();
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stations" });
    }
  });

  // Get station by ID
  app.get("/api/stations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid station ID" });
      }
      
      const station = await storage.getStationById(id);
      if (!station) {
        return res.status(404).json({ error: "Station not found" });
      }
      
      res.json(station);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch station" });
    }
  });

  // Search stations
  app.get("/api/stations/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const stations = await storage.searchStations(query);
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: "Failed to search stations" });
    }
  });

  // Get stations by genre
  app.get("/api/stations/genre/:genre", async (req, res) => {
    try {
      const genre = req.params.genre;
      const stations = await storage.getStationsByGenre(genre);
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stations by genre" });
    }
  });

  // Get user favorites
  app.get("/api/favorites/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const favorites = await storage.getFavoritesByUser(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  });

  // Add favorite
  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addFavorite(validatedData);
      res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to add favorite" });
    }
  });

  // Remove favorite
  app.delete("/api/favorites/:stationId/:userId", async (req, res) => {
    try {
      const stationId = parseInt(req.params.stationId);
      const userId = req.params.userId;
      
      if (isNaN(stationId)) {
        return res.status(400).json({ error: "Invalid station ID" });
      }
      
      const removed = await storage.removeFavorite(stationId, userId);
      if (!removed) {
        return res.status(404).json({ error: "Favorite not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove favorite" });
    }
  });

  // Check if station is favorite
  app.get("/api/favorites/:stationId/:userId/check", async (req, res) => {
    try {
      const stationId = parseInt(req.params.stationId);
      const userId = req.params.userId;
      
      if (isNaN(stationId)) {
        return res.status(400).json({ error: "Invalid station ID" });
      }
      
      const isFavorite = await storage.isFavorite(stationId, userId);
      res.json({ isFavorite });
    } catch (error) {
      res.status(500).json({ error: "Failed to check favorite status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
