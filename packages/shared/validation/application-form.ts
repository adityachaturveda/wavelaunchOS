import { z } from "zod";

export const contentTypeOptions = [
  "Long-form video",
  "Short-form video",
  "Livestreams",
  "Podcasts",
  "Blog articles",
  "Social posts",
  "Newsletters",
  "Events / IRL activations",
] as const;

export const primaryPlatformOptions = [
  "Instagram",
  "YouTube",
  "TikTok",
  "LinkedIn",
  "Twitch",
  "Podcast",
  "Blog",
  "Other",
] as const;

export const collaborationPreferenceOptions = [
  "Sponsored content",
  "Product collaborations",
  "Affiliate / performance",
  "Licensing",
  "Speaking engagements",
] as const;

export const referralSourceOptions = [
  "Existing creator",
  "Brand partner",
  "Social media",
  "Press / PR",
  "Conference",
  "Other",
] as const;

export const brandStageOptions = ["Pre-launch", "Early", "Growth", "Established", "Other"] as const;

export const decisionTimelineOptions = ["Immediately", "1-3 months", "3-6 months", "6+ months"] as const;

export const contactMethodOptions = ["Email", "Phone", "Text", "WhatsApp", "Other"] as const;

const emptyToUndefined = (value: unknown) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return value;
};

const optionalString = z.preprocess(
  emptyToUndefined,
  z
    .string({ invalid_type_error: "Must be text" })
    .trim()
    .optional()
);

const optionalUrl = z.preprocess(
  emptyToUndefined,
  z
    .string({ invalid_type_error: "Must be a URL" })
    .trim()
    .url("Must be a valid URL")
    .optional()
);

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(emptyToUndefined, z.enum(values).optional());

const positiveIntegerBase = z.coerce.number({ invalid_type_error: "Must be a number" }).int().min(0);

const requiredPositiveInteger = z.preprocess(emptyToUndefined, positiveIntegerBase);

const optionalPositiveInteger = z.preprocess(emptyToUndefined, positiveIntegerBase.optional());

const percentageSchema = z.preprocess(
  emptyToUndefined,
  z
    .coerce.number({ invalid_type_error: "Provide a number between 0 and 100" })
    .min(0)
    .max(100)
    .optional()
);

export const applicationFormSchema = z.object({
  applicant: z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z.string().trim().email("Provide a valid email"),
    phoneNumber: optionalString,
    locationCity: optionalString,
    locationCountry: z.string().trim().min(1, "Country is required"),
    timezone: z.string().trim().min(1, "Timezone is required"),
    portfolioUrl: optionalUrl,
    referralSource: optionalEnum(referralSourceOptions),
  }),
  brand: z.object({
    brandName: optionalString,
    brandWebsite: optionalUrl,
    industry: z.string().trim().min(1, "Industry is required"),
    brandStage: optionalEnum(brandStageOptions),
    brandDescription: optionalString,
  }),
  social: z.object({
    instagramHandle: optionalString,
    instagramFollowers: optionalPositiveInteger,
    youtubeChannelUrl: optionalUrl,
    youtubeSubscribers: optionalPositiveInteger,
    tiktokHandle: optionalString,
    tiktokFollowers: optionalPositiveInteger,
    newsletterSubscribers: optionalPositiveInteger,
    otherAudienceChannels: optionalString,
  }),
  audience: z.object({
    primaryPlatform: z.enum(primaryPlatformOptions),
    contentTypes: z
      .array(z.enum(contentTypeOptions))
      .min(1, "Select at least one content type"),
    audienceSize: requiredPositiveInteger,
    audienceRegions: optionalString,
    audienceAgeBrackets: optionalString,
    audienceGenderSplit: percentageSchema,
    engagementRate: percentageSchema,
  }),
  content: z.object({
    averageMonthlyContent: optionalPositiveInteger,
    collaborationHistory: optionalString,
    brandSafetyConsiderations: optionalString,
    toolsAndSoftware: optionalString,
    languages: optionalString,
  }),
  goals: z.object({
    shortTermGoals: z
      .string()
      .trim()
      .min(10, "Share at least one short-term goal"),
    longTermGoals: optionalString,
    collaborationPreferences: z
      .array(z.enum(collaborationPreferenceOptions))
      .min(1, "Select at least one collaboration preference"),
    preferredBrands: optionalString,
  }),
  logistics: z.object({
    availabilityStartDate: z.string().trim().min(1, "Availability date required"),
    decisionTimeline: optionalEnum(decisionTimelineOptions),
    budgetRange: optionalString,
    preferredContactMethod: optionalEnum(contactMethodOptions),
    additionalNotes: optionalString,
  }),
});

export type ApplicationFormSubmission = z.infer<typeof applicationFormSchema>;

export type ApplicationFormFieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "url"
  | "select"
  | "multi-select"
  | "date";

export interface ApplicationFormFieldMeta {
  name: string;
  label: string;
  type: ApplicationFormFieldType;
  required: boolean;
  helperText?: string;
  options?: readonly string[];
}

export interface ApplicationFormSectionMeta {
  id: keyof ApplicationFormSubmission;
  title: string;
  description?: string;
  fields: ApplicationFormFieldMeta[];
}

const textField = (
  name: string,
  label: string,
  required = false,
  helperText?: string
): ApplicationFormFieldMeta => ({
  name,
  label,
  type: "text",
  required,
  helperText,
});

export const applicationFormSections: ApplicationFormSectionMeta[] = [
  {
    id: "applicant",
    title: "Applicant Details",
    description: "Tell us who you are and how to reach you.",
    fields: [
      textField("fullName", "Full name", true),
      { name: "email", label: "Email", type: "email", required: true },
      textField("phoneNumber", "Phone number"),
      textField("locationCity", "City"),
      textField("locationCountry", "Country", true),
      textField("timezone", "Time zone", true),
      { name: "portfolioUrl", label: "Portfolio URL", type: "url", required: false },
      {
        name: "referralSource",
        label: "How did you hear about us?",
        type: "select",
        required: false,
        options: referralSourceOptions,
      },
    ],
  },
  {
    id: "brand",
    title: "Brand Overview",
    description: "Share high-level information about your brand or company.",
    fields: [
      textField("brandName", "Brand name"),
      { name: "brandWebsite", label: "Brand website", type: "url", required: false },
      textField("industry", "Industry", true),
      {
        name: "brandStage",
        label: "Brand stage",
        type: "select",
        required: false,
        options: brandStageOptions,
      },
      {
        name: "brandDescription",
        label: "Brand description",
        type: "textarea",
        required: false,
        helperText: "Tell us what makes the brand unique",
      },
    ],
  },
  {
    id: "social",
    title: "Social & Audience Channels",
    description: "Help us understand your current reach across key channels.",
    fields: [
      textField("instagramHandle", "Instagram handle"),
      { name: "instagramFollowers", label: "Instagram followers", type: "number", required: false },
      { name: "youtubeChannelUrl", label: "YouTube channel URL", type: "url", required: false },
      { name: "youtubeSubscribers", label: "YouTube subscribers", type: "number", required: false },
      textField("tiktokHandle", "TikTok handle"),
      { name: "tiktokFollowers", label: "TikTok followers", type: "number", required: false },
      { name: "newsletterSubscribers", label: "Newsletter subscribers", type: "number", required: false },
      {
        name: "otherAudienceChannels",
        label: "Other audience channels",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    id: "audience",
    title: "Audience Profile",
    description: "Describe who your audience is and how they engage with you.",
    fields: [
      {
        name: "primaryPlatform",
        label: "Primary platform",
        type: "select",
        required: true,
        options: primaryPlatformOptions,
      },
      {
        name: "contentTypes",
        label: "Content types",
        type: "multi-select",
        required: true,
        options: contentTypeOptions,
      },
      { name: "audienceSize", label: "Audience size", type: "number", required: true },
      textField("audienceRegions", "Key regions"),
      textField("audienceAgeBrackets", "Age brackets"),
      {
        name: "audienceGenderSplit",
        label: "Gender split (%)",
        type: "number",
        required: false,
        helperText: "Estimate if available",
      },
      {
        name: "engagementRate",
        label: "Engagement rate (%)",
        type: "number",
        required: false,
        helperText: "Average engagement across your primary platform",
      },
    ],
  },
  {
    id: "content",
    title: "Content Operations",
    description: "Outline your content cadence and working style.",
    fields: [
      {
        name: "averageMonthlyContent",
        label: "Average content pieces per month",
        type: "number",
        required: false,
      },
      {
        name: "collaborationHistory",
        label: "Recent brand collaborations",
        type: "textarea",
        required: false,
      },
      {
        name: "brandSafetyConsiderations",
        label: "Brand safety considerations",
        type: "textarea",
        required: false,
      },
      {
        name: "toolsAndSoftware",
        label: "Key tools & software",
        type: "textarea",
        required: false,
      },
      {
        name: "languages",
        label: "Languages spoken",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "goals",
    title: "Goals & Collaboration Preferences",
    fields: [
      {
        name: "shortTermGoals",
        label: "Short-term goals",
        type: "textarea",
        required: true,
      },
      {
        name: "longTermGoals",
        label: "Long-term goals",
        type: "textarea",
        required: false,
      },
      {
        name: "collaborationPreferences",
        label: "Preferred collaboration types",
        type: "multi-select",
        required: true,
        options: collaborationPreferenceOptions,
      },
      {
        name: "preferredBrands",
        label: "Brands you'd love to work with",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics & Operations",
    fields: [
      {
        name: "availabilityStartDate",
        label: "Availability start date",
        type: "date",
        required: true,
      },
      {
        name: "decisionTimeline",
        label: "Decision timeline",
        type: "select",
        required: false,
        options: decisionTimelineOptions,
      },
      textField("budgetRange", "Budget / compensation range"),
      {
        name: "preferredContactMethod",
        label: "Preferred contact method",
        type: "select",
        required: false,
        options: contactMethodOptions,
      },
      {
        name: "additionalNotes",
        label: "Additional notes",
        type: "textarea",
        required: false,
      },
    ],
  },
];
