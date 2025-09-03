import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Personal info endpoint
  app.get("/api/personal-info", async (req, res) => {
    try {
      const personalInfo = await storage.getPersonalInfo();
      if (!personalInfo) {
        return res.status(404).json({ message: "Personal info not found" });
      }
      res.json(personalInfo);
    } catch (error) {
      console.error("Get personal info error:", error);
      res.status(500).json({ message: "Failed to fetch personal info" });
    }
  });

  // Skills endpoints
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      console.error("Get skills error:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.get("/api/skills/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const skills = await storage.getSkillsByCategory(category);
      res.json(skills);
    } catch (error) {
      console.error("Get skills by category error:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Projects endpoints
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Get projects error:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Get project error:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Technology slider endpoint
  app.get("/api/technology-slider", async (req, res) => {
    try {
      const technologies = await storage.getTechnologySlider();
      res.json(technologies);
    } catch (error) {
      console.error("Get technology slider error:", error);
      res.status(500).json({ message: "Failed to fetch technology slider" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, subject, message } = req.body;
      
      // Validate with Zod schema
      const validatedData = insertContactMessageSchema.parse({
        firstName,
        lastName,
        email,
        subject,
        message
      });

      // Save to database
      const contactMessage = await storage.createContactMessage(validatedData);

      console.log("Contact form submission saved:", {
        id: contactMessage.id,
        name: `${firstName} ${lastName}`,
        email,
        subject,
        timestamp: contactMessage.createdAt
      });

      res.json({ 
        message: "Message sent successfully! I'll get back to you soon.",
        id: contactMessage.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          message: "Please fill in all required fields correctly",
          errors: (error as any).errors
        });
      }
      
      res.status(500).json({ 
        message: "Failed to send message. Please try again." 
      });
    }
  });

  // Contact messages endpoint (for admin/future use)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Get contact messages error:", error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
