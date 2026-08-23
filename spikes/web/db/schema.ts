import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const signals = sqliteTable("signals", {
  id: text("id").primaryKey(), domain: text("domain").notNull(), title: text("title").notNull(), claim: text("claim").notNull(),
  whyItMatters: text("why_it_matters").notNull(), evidenceQuality: text("evidence_quality").notNull(), evidenceRationale: text("evidence_rationale").notNull(),
  priority: text("priority").notNull(), disposition: text("disposition").notNull().default("UNDECIDED"), workflowStatus: text("workflow_status").notNull().default("OPEN"),
  moveText: text("move_text").notNull().default(""), moveState: text("move_state").notNull().default("NOT_STARTED"), confirmationState: text("confirmation_state").notNull().default("DRAFT"),
  reviewTrigger: text("review_trigger").notNull().default(""), asOfDate: text("as_of_date").notNull(), updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
export const sources = sqliteTable("sources", { id: integer("id").primaryKey({ autoIncrement:true }), title:text("title").notNull(), publisher:text("publisher").notNull(), sourceType:text("source_type").notNull(), locator:text("locator").notNull(), publicationDate:text("publication_date").notNull(), createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`) });
export const signalEvidence = sqliteTable("signal_evidence", { id:integer("id").primaryKey({autoIncrement:true}), signalId:text("signal_id").notNull(), sourceId:integer("source_id").notNull(), relationship:text("relationship").notNull(), scopeMatch:text("scope_match").notNull(), evidenceNote:text("evidence_note").notNull().default("") });
export const projects = sqliteTable("projects", { id:text("id").primaryKey(), name:text("name").notNull(), description:text("description").notNull(), status:text("status").notNull().default("ACTIVE") });
export const signalProjects = sqliteTable("signal_projects", { id:integer("id").primaryKey({autoIncrement:true}), signalId:text("signal_id").notNull(), projectId:text("project_id").notNull(), reason:text("reason").notNull(), confirmedByUser:integer("confirmed_by_user",{mode:"boolean"}).notNull().default(false) });
export const signalEvents = sqliteTable("signal_events", { id:integer("id").primaryKey({autoIncrement:true}), signalId:text("signal_id").notNull(), eventType:text("event_type").notNull(), payload:text("payload").notNull(), createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`) });
