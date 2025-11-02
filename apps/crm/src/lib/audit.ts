import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

interface RecordAuditEventOptions {
  action: string;
  entityType: string;
  entityId?: string;
  actorId?: string;
  metadata?: Prisma.JsonValue;
}

export async function recordAuditEvent({
  action,
  entityType,
  entityId,
  actorId,
  metadata,
}: RecordAuditEventOptions): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        entityType,
        entityId,
        actorId,
        metadata: metadata ?? undefined,
      },
    });
  } catch (error) {
    console.error("Failed to record audit event", error);
  }
}
