import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Personal Information
export const personalInfo = pgTable("personal_info", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull(),
  yearsExperience: integer("years_experience").notNull(),
  projectsCompleted: integer("projects_completed").notNull(),
  technologiesCount: integer("technologies_count").notNull(),
  clientSatisfaction: integer("client_satisfaction").notNull(),
  about: text("about").notNull(),
  journey: text("journey").notNull(),
  education: text("education").notNull(),
  educationFocus: text("education_focus").notNull(),
  experience: text("experience").notNull(),
  experienceCompany: text("experience_company").notNull(),
  experienceDescription: text("experience_description").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Skills/Technologies
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // frontend, backend, database, mobile, tools
  percentage: integer("percentage").notNull(),
  color: text("color").notNull(),
  iconName: text("icon_name").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  iconName: text("icon_name"),
  demoLink: text("demo_link"),
  codeLink: text("code_link"),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Project Tags (Many-to-Many relationship)
export const projectTags = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  label: text("label").notNull(),
  color: text("color").notNull(),
});

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Technology Slider Items
export const technologySlider = pgTable("technology_slider", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  iconName: text("icon_name").notNull(),
  color: text("color").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPersonalInfoSchema = createInsertSchema(personalInfo).omit({
  id: true,
  updatedAt: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertProjectTagSchema = createInsertSchema(projectTags).omit({
  id: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

export const insertTechnologySliderSchema = createInsertSchema(technologySlider).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type PersonalInfo = typeof personalInfo.$inferSelect;
export type InsertPersonalInfo = z.infer<typeof insertPersonalInfoSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type ProjectTag = typeof projectTags.$inferSelect;
export type InsertProjectTag = z.infer<typeof insertProjectTagSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type TechnologySliderItem = typeof technologySlider.$inferSelect;
export type InsertTechnologySliderItem = z.infer<typeof insertTechnologySliderSchema>;
