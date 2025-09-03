import { storage } from "./storage";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Seed personal info
    const personalInfo = {
      name: "Rishabh Vishwakarma",
      title: "Full Stack Developer",
      description: "Full Stack Developer crafting digital experiences with MERN stack, Java, PHP, and Flutter",
      phone: "+91 7803094853",
      email: "rvish230801@gmail.com",
      whatsapp: "+91 7803094853",
      yearsExperience: 2,
      projectsCompleted: 15,
      technologiesCount: 6,
      clientSatisfaction: 100,
      about: "Passionate full-stack developer with expertise in modern web technologies and mobile app development",
      journey: "I'm a passionate full-stack developer with over 2 years of experience in creating innovative web and mobile applications. My expertise spans across the MERN stack, Java, PHP, and Flutter development. I believe in writing clean, maintainable code and creating user experiences that make a difference. My goal is to leverage technology to solve real-world problems and bring creative ideas to life.",
      education: "Computer Science Engineering",
      educationFocus: "Focus on Software Development & Data Structures",
      experience: "Full Stack Developer",
      experienceCompany: "Freelance & Personal Projects",
      experienceDescription: "2+ years developing web and mobile applications"
    };

    await storage.updatePersonalInfo(personalInfo);
    console.log("✅ Personal info seeded");

    // Seed technology slider
    const technologies = [
      { name: "React", iconName: "Globe", color: "text-primary", displayOrder: 1, isActive: true },
      { name: "Node.js", iconName: "Server", color: "text-green-500", displayOrder: 2, isActive: true },
      { name: "MongoDB", iconName: "Database", color: "text-green-600", displayOrder: 3, isActive: true },
      { name: "Java", iconName: "Code", color: "text-blue-600", displayOrder: 4, isActive: true },
      { name: "Flutter", iconName: "Smartphone", color: "text-blue-400", displayOrder: 5, isActive: true },
      { name: "PHP", iconName: "Terminal", color: "text-purple-600", displayOrder: 6, isActive: true }
    ];

    for (const tech of technologies) {
      await storage.createTechnologySliderItem(tech);
    }
    console.log("✅ Technology slider seeded");

    // Seed skills
    const skills = [
      // Frontend
      { name: "React.js", category: "frontend", percentage: 90, color: "primary", iconName: "Globe", displayOrder: 1, isActive: true },
      { name: "HTML/CSS", category: "frontend", percentage: 95, color: "accent", iconName: "Layout", displayOrder: 2, isActive: true },
      { name: "JavaScript", category: "frontend", percentage: 85, color: "chart-3", iconName: "Code", displayOrder: 3, isActive: true },
      
      // Backend
      { name: "Node.js", category: "backend", percentage: 88, color: "chart-2", iconName: "Server", displayOrder: 1, isActive: true },
      { name: "Java", category: "backend", percentage: 80, color: "destructive", iconName: "Coffee", displayOrder: 2, isActive: true },
      { name: "PHP", category: "backend", percentage: 75, color: "chart-5", iconName: "Terminal", displayOrder: 3, isActive: true },
      
      // Database & Tools
      { name: "MongoDB", category: "database", percentage: 85, color: "chart-2", iconName: "Database", displayOrder: 1, isActive: true },
      { name: "Git/GitHub", category: "tools", percentage: 90, color: "accent", iconName: "GitBranch", displayOrder: 1, isActive: true },
      
      // Mobile
      { name: "Flutter", category: "mobile", percentage: 78, color: "primary", iconName: "Smartphone", displayOrder: 1, isActive: true },
      { name: "Dart", category: "mobile", percentage: 76, color: "chart-5", iconName: "Tablet", displayOrder: 2, isActive: true }
    ];

    for (const skill of skills) {
      await storage.createSkill(skill);
    }
    console.log("✅ Skills seeded");

    // Seed projects
    const projects = [
      {
        title: "ShopEasy Platform",
        description: "Full-stack e-commerce platform with payment integration, user authentication, and admin dashboard.",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        iconName: null,
        demoLink: "#",
        codeLink: "#",
        displayOrder: 1,
        isActive: true
      },
      {
        title: "TaskFlow Mobile",
        description: "Cross-platform task management app with offline sync, notifications, and team collaboration.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        iconName: null,
        demoLink: "#",
        codeLink: "#",
        displayOrder: 2,
        isActive: true
      },
      {
        title: "Analytics Pro",
        description: "Business analytics dashboard with real-time data visualization and reporting features.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        iconName: null,
        demoLink: "#",
        codeLink: "#",
        displayOrder: 3,
        isActive: true
      },
      {
        title: "ContentHub CMS",
        description: "Custom content management system with role-based access and media management.",
        imageUrl: null,
        iconName: "Globe",
        demoLink: "#",
        codeLink: "#",
        displayOrder: 4,
        isActive: true
      },
      {
        title: "LearnSpace Platform",
        description: "Online learning platform with course management, quizzes, and progress tracking.",
        imageUrl: null,
        iconName: "BookOpen",
        demoLink: "#",
        codeLink: "#",
        displayOrder: 5,
        isActive: true
      },
      {
        title: "HealthTracker App",
        description: "Personal health tracking mobile app with fitness goals and medical records.",
        imageUrl: null,
        iconName: "Heart",
        demoLink: "#",
        codeLink: "#",
        displayOrder: 6,
        isActive: true
      }
    ];

    const projectTags = [
      // ShopEasy Platform tags
      { label: "MERN Stack", color: "bg-primary/10 text-primary" },
      { label: "E-commerce", color: "bg-accent/10 text-accent-foreground" },
      
      // TaskFlow Mobile tags
      { label: "Flutter", color: "bg-blue-100 text-blue-600" },
      { label: "Mobile", color: "bg-green-100 text-green-600" },
      
      // Analytics Pro tags
      { label: "Java", color: "bg-purple-100 text-purple-600" },
      { label: "Dashboard", color: "bg-orange-100 text-orange-600" },
      
      // ContentHub CMS tags
      { label: "PHP", color: "bg-red-100 text-red-600" },
      { label: "CMS", color: "bg-blue-100 text-blue-600" },
      
      // LearnSpace Platform tags
      { label: "React", color: "bg-primary/10 text-primary" },
      { label: "Education", color: "bg-green-100 text-green-600" },
      
      // HealthTracker App tags
      { label: "Flutter", color: "bg-blue-100 text-blue-600" },
      { label: "Health", color: "bg-red-100 text-red-600" }
    ];

    for (let i = 0; i < projects.length; i++) {
      const project = await storage.createProject(projects[i]);
      
      // Add tags for each project (2 tags per project)
      const startTagIndex = i * 2;
      for (let j = 0; j < 2; j++) {
        if (projectTags[startTagIndex + j]) {
          await storage.createProjectTag({
            projectId: project.id,
            ...projectTags[startTagIndex + j]
          });
        }
      }
    }
    console.log("✅ Projects and tags seeded");

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Only run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedDatabase };