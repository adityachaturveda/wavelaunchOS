import { describe, expect, it } from "vitest";

import {
  applicationFormSchema,
  applicationFormSections,
  ApplicationFormSectionMeta,
  ApplicationFormSubmission,
  contentTypeOptions,
} from "../../validation/application-form";

const baseSubmission: ApplicationFormSubmission = {
  applicant: {
    fullName: "Jane Creator",
    email: "jane@example.com",
    phoneNumber: undefined,
    locationCity: "Austin",
    locationCountry: "USA",
    timezone: "America/Chicago",
    portfolioUrl: undefined,
    referralSource: "Existing creator",
  },
  brand: {
    brandName: "Creative Co",
    brandWebsite: "https://creative.example.com",
    industry: "Lifestyle",
    brandStage: "Growth",
    brandDescription: "Premium lifestyle content",
  },
  social: {
    instagramHandle: "@janedoesocial",
    instagramFollowers: 250000,
    youtubeChannelUrl: "https://youtube.com/@janedoe",
    youtubeSubscribers: 100000,
    tiktokHandle: "@janedoe",
    tiktokFollowers: 50000,
    newsletterSubscribers: 12000,
    otherAudienceChannels: "Pinterest community",
  },
  audience: {
    primaryPlatform: "Instagram",
    contentTypes: [contentTypeOptions[0], contentTypeOptions[1]],
    audienceSize: 400000,
    audienceRegions: "US, Canada",
    audienceAgeBrackets: "18-24, 25-34",
    audienceGenderSplit: 60,
    engagementRate: 4.5,
  },
  content: {
    averageMonthlyContent: 20,
    collaborationHistory: "Worked with Brand A, Brand B",
    brandSafetyConsiderations: "No alcohol brands",
    toolsAndSoftware: "Adobe CC, Notion",
    languages: "English, Spanish",
  },
  goals: {
    shortTermGoals: "Launch a capsule collection this year.",
    longTermGoals: "Build multi-brand partnerships globally.",
    collaborationPreferences: ["Sponsored content", "Licensing"],
    preferredBrands: "Brand X, Brand Y",
  },
  logistics: {
    availabilityStartDate: "2025-01-15",
    decisionTimeline: "1-3 months",
    budgetRange: "$10k-$25k",
    preferredContactMethod: "Email",
    additionalNotes: "Excited to collaborate soon!",
  },
};

describe("applicationFormSchema", () => {
  it("validates a complete submission", () => {
    const result = applicationFormSchema.safeParse(baseSubmission);
    if (!result.success) {
      console.error(result.error.flatten());
    }
    expect(result.success).toBe(true);
  });

  it("rejects missing required applicant details", () => {
    const result = applicationFormSchema.safeParse({
      ...baseSubmission,
      applicant: {
        ...baseSubmission.applicant,
        fullName: "",
      },
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      console.error(result.error.flatten());
      expect(result.error.flatten().fieldErrors.applicant?.[0]).toContain("Full name is required");
    }
  });

  it("coerces number strings and strips empty values", () => {
    const result = applicationFormSchema.safeParse({
      ...baseSubmission,
      social: {
        instagramHandle: "",
        instagramFollowers: "250000",
        youtubeChannelUrl: "",
        youtubeSubscribers: "100000",
        tiktokHandle: "",
        tiktokFollowers: "",
        newsletterSubscribers: "",
        otherAudienceChannels: "",
      },
      audience: {
        ...baseSubmission.audience,
        audienceSize: "400000",
        audienceGenderSplit: "",
        engagementRate: "4.5",
      },
      content: {
        averageMonthlyContent: "20",
        collaborationHistory: "",
        brandSafetyConsiderations: "",
        toolsAndSoftware: "",
        languages: "",
      },
      goals: {
        ...baseSubmission.goals,
        preferredBrands: "",
      },
      logistics: {
        ...baseSubmission.logistics,
        budgetRange: "",
        preferredContactMethod: "",
        additionalNotes: "",
      },
    });

    if (!result.success) {
      console.error(result.error.flatten());
    }
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.social.instagramHandle).toBeUndefined();
      expect(result.data.social.instagramFollowers).toBe(250000);
      expect(result.data.audience.audienceGenderSplit).toBeUndefined();
      expect(result.data.audience.engagementRate).toBe(4.5);
      expect(result.data.content.collaborationHistory).toBeUndefined();
    }
  });

  it("enforces multi-select minimum selections", () => {
    const result = applicationFormSchema.safeParse({
      ...baseSubmission,
      audience: {
        ...baseSubmission.audience,
        contentTypes: [],
      },
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      console.error(result.error.flatten());
      const errors = result.error.flatten().fieldErrors.audience;
      expect(errors && errors[0]).toContain("Select at least one content type");
    }
  });
});

describe("applicationFormSections metadata", () => {
  it("covers all top-level schema keys", () => {
    const schemaKeys = new Set(Object.keys(applicationFormSchema.shape));
    const sectionKeys = new Set(
      applicationFormSections.map((section: ApplicationFormSectionMeta) => section.id)
    );
    expect(sectionKeys).toEqual(schemaKeys);
  });
});
