import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

async function main() {
  const adminPassword = requireEnv("SEED_ADMIN_PASSWORD");
  const encryptedCredentialValue =
    process.env.SEED_ENCRYPTED_CREDENTIAL ?? "<encrypted-secret-placeholder>";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@studio-os.com" },
    update: {
      passwordHash: adminPasswordHash,
    },
    create: {
      id: "seed-user-admin",
      email: "admin@studio-os.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  const sampleBrand = await prisma.brand.upsert({
    where: { id: "seed-brand-studio-os" },
    update: {},
    create: {
      id: "seed-brand-studio-os",
      name: "Studio OS",
      description: "Internal operations brand for Wavelaunch Studio",
      industry: "Media",
      status: "ACTIVE",
      website: "https://studio-os.example.com",
      notes: "Seed brand generated for local development.",
    },
  });

  const sampleCreator = await prisma.creator.upsert({
    where: { id: "seed-creator-wavelaunch" },
    update: {},
    create: {
      id: "seed-creator-wavelaunch",
      name: "Wavelaunch Creator",
      email: "creator@wavelaunch.example",
      status: "ACTIVE",
      summary: "Demo creator profile created by seed script.",
      socialHandles: {
        instagram: "@wavelaunch",
        youtube: "youtube.com/@wavelaunch",
      },
      notes: "Replace with real creator data during development.",
    },
  });

  await prisma.creatorBrand.upsert({
    where: {
      creatorId_brandId: {
        creatorId: sampleCreator.id,
        brandId: sampleBrand.id,
      },
    },
    update: {},
    create: {
      id: "seed-creator-brand-link",
      creatorId: sampleCreator.id,
      brandId: sampleBrand.id,
      role: "Primary Talent",
    },
  });

  const sampleProject = await prisma.project.upsert({
    where: { id: "seed-project-launch" },
    update: {},
    create: {
      id: "seed-project-launch",
      name: "Launch Campaign",
      status: "IN_PROGRESS",
      summary: "Initial launch project seeded for CRM UI demos.",
      startDate: new Date(),
      creatorId: sampleCreator.id,
      brandId: sampleBrand.id,
      createdById: adminUser.id,
    },
  });

  await prisma.credential.upsert({
    where: { id: "seed-credential-demo" },
    update: {
      encryptedValue: encryptedCredentialValue,
    },
    create: {
      id: "seed-credential-demo",
      name: "Studio Analytics Login",
      type: "PASSWORD",
      encryptedValue: encryptedCredentialValue,
      username: "studio_admin",
      url: "https://analytics.studio-os.example.com",
      notes: "Replace with environment-specific encrypted value.",
      brandId: sampleBrand.id,
      createdById: adminUser.id,
    },
  });

  await prisma.applicationFormSubmission.upsert({
    where: { id: "seed-submission-001" },
    update: {
      status: "PROCESSED",
      creatorId: sampleCreator.id,
    },
    create: {
      id: "seed-submission-001",
      applicantName: sampleCreator.name,
      applicantEmail: sampleCreator.email ?? "creator@wavelaunch.example",
      status: "PROCESSED",
      payload: {
        goals: "Demonstrate schema seeding.",
        audience: "Developers testing Studio OS.",
      },
      creatorId: sampleCreator.id,
      notes: "Linked to seed creator for reference.",
    },
  });

  await prisma.auditLog.create({
    data: {
      id: "seed-audit-log-001",
      action: "SEED_INITIAL_DATA",
      entityType: "Project",
      entityId: sampleProject.id,
      actorId: adminUser.id,
      metadata: {
        description: "Seed script executed for local development.",
      },
    },
  });

  await prisma.aITemplate.upsert({
    where: { id: "seed-template-onboarding" },
    update: {},
    create: {
      id: "seed-template-onboarding",
      name: "Creator Onboarding Email",
      category: "Communication",
      description: "Template for onboarding new creators into Studio OS",
      content: {
        subject: "Welcome to Studio OS",
        body: "Hi {{name}}, welcome to Studio OS...",
      },
      createdById: adminUser.id,
    },
  });

  console.log("✅ Seed data created successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Seed script failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
