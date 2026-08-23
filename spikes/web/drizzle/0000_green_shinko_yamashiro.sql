CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'ACTIVE' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `signal_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`signal_id` text NOT NULL,
	`event_type` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `signal_evidence` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`signal_id` text NOT NULL,
	`source_id` integer NOT NULL,
	`relationship` text NOT NULL,
	`scope_match` text NOT NULL,
	`evidence_note` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `signal_projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`signal_id` text NOT NULL,
	`project_id` text NOT NULL,
	`reason` text NOT NULL,
	`confirmed_by_user` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `signals` (
	`id` text PRIMARY KEY NOT NULL,
	`domain` text NOT NULL,
	`title` text NOT NULL,
	`claim` text NOT NULL,
	`why_it_matters` text NOT NULL,
	`evidence_quality` text NOT NULL,
	`evidence_rationale` text NOT NULL,
	`priority` text NOT NULL,
	`disposition` text DEFAULT 'UNDECIDED' NOT NULL,
	`workflow_status` text DEFAULT 'OPEN' NOT NULL,
	`move_text` text DEFAULT '' NOT NULL,
	`move_state` text DEFAULT 'NOT_STARTED' NOT NULL,
	`confirmation_state` text DEFAULT 'DRAFT' NOT NULL,
	`review_trigger` text DEFAULT '' NOT NULL,
	`as_of_date` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`publisher` text NOT NULL,
	`source_type` text NOT NULL,
	`locator` text NOT NULL,
	`publication_date` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
