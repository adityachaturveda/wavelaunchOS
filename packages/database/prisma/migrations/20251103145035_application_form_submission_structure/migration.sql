-- CreateTable
CREATE TABLE "ApplicationFormSubmission" (
    "id" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "applicantEmail" TEXT NOT NULL,
    "normalizedEmail" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "payload" JSONB NOT NULL,
    "submittedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ApplicationFormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationFormSubmission_normalizedEmail_key" ON "ApplicationFormSubmission"("normalizedEmail");

-- CreateIndex
CREATE INDEX "ApplicationFormSubmission_applicantEmail_idx" ON "ApplicationFormSubmission"("applicantEmail");

-- CreateIndex
CREATE INDEX "ApplicationFormSubmission_normalizedEmail_submittedAt_idx" ON "ApplicationFormSubmission"("normalizedEmail", "submittedAt");

-- CreateIndex
CREATE INDEX "ApplicationFormSubmission_creatorId_idx" ON "ApplicationFormSubmission"("creatorId");

-- AddForeignKey
ALTER TABLE "ApplicationFormSubmission" ADD CONSTRAINT "ApplicationFormSubmission_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
