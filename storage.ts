import { 
  type User, 
  type InsertUser,
  type PersonalInfo,
  type InsertPersonalInfo,
  type Skill,
  type InsertSkill,
  type Project,
  type InsertProject,
  type ProjectTag,
  type InsertProjectTag,
  type ContactMessage,
  type InsertContactMessage,
  type TechnologySliderItem,
  type InsertTechnologySliderItem,
  users,
  personalInfo,
  skills,
  projects,
  projectTags,
  contactMessages,
  technologySlider
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Personal info methods
  getPersonalInfo(): Promise<PersonalInfo | undefined>;
  updatePersonalInfo(info: InsertPersonalInfo): Promise<PersonalInfo>;
  
  // Skills methods
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  
  // Projects methods
  getProjects(): Promise<Array<Project & { tags: ProjectTag[] }>>;
  getProject(id: number): Promise<(Project & { tags: ProjectTag[] }) | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  
  // Project tags methods
  createProjectTag(tag: InsertProjectTag): Promise<ProjectTag>;
  getProjectTags(projectId: number): Promise<ProjectTag[]>;
  
  // Contact messages methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Technology slider methods
  getTechnologySlider(): Promise<TechnologySliderItem[]>;
  createTechnologySliderItem(item: InsertTechnologySliderItem): Promise<TechnologySliderItem>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getPersonalInfo(): Promise<PersonalInfo | undefined> {
    const [info] = await db.select().from(personalInfo).limit(1);
    return info || undefined;
  }

  async updatePersonalInfo(info: InsertPersonalInfo): Promise<PersonalInfo> {
    // First check if personal info exists
    const existing = await this.getPersonalInfo();
    
    if (existing) {
      const [updated] = await db
        .update(personalInfo)
        .set({ ...info, updatedAt: new Date() })
        .where(eq(personalInfo.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(personalInfo)
        .values(info)
        .returning();
      return created;
    }
  }

  async getSkills(): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(eq(skills.isActive, true))
      .orderBy(skills.displayOrder, skills.name);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(eq(skills.category, category))
      .orderBy(skills.displayOrder, skills.name);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [created] = await db
      .insert(skills)
      .values(skill)
      .returning();
    return created;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updated] = await db
      .update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updated || undefined;
  }

  async getProjects(): Promise<Array<Project & { tags: ProjectTag[] }>> {
    const projectsList = await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(projects.displayOrder, desc(projects.createdAt));

    const projectsWithTags = await Promise.all(
      projectsList.map(async (project) => {
        const tags = await this.getProjectTags(project.id);
        return { ...project, tags };
      })
    );

    return projectsWithTags;
  }

  async getProject(id: number): Promise<(Project & { tags: ProjectTag[] }) | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
      
    if (!project) return undefined;
    
    const tags = await this.getProjectTags(project.id);
    return { ...project, tags };
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db
      .insert(projects)
      .values(project)
      .returning();
    return created;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updated || undefined;
  }

  async createProjectTag(tag: InsertProjectTag): Promise<ProjectTag> {
    const [created] = await db
      .insert(projectTags)
      .values(tag)
      .returning();
    return created;
  }

  async getProjectTags(projectId: number): Promise<ProjectTag[]> {
    return await db
      .select()
      .from(projectTags)
      .where(eq(projectTags.projectId, projectId));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return created;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  async getTechnologySlider(): Promise<TechnologySliderItem[]> {
    return await db
      .select()
      .from(technologySlider)
      .where(eq(technologySlider.isActive, true))
      .orderBy(technologySlider.displayOrder, technologySlider.name);
  }

  async createTechnologySliderItem(item: InsertTechnologySliderItem): Promise<TechnologySliderItem> {
    const [created] = await db
      .insert(technologySlider)
      .values(item)
      .returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
