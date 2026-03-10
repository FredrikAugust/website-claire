import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "cv_sections_entries_pieces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar
  );
  
  CREATE TABLE "cv_sidebar_sections_entries_pieces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar
  );
  
  CREATE TABLE "performance_page_affiliations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"organization" varchar NOT NULL,
  	"role" varchar,
  	"years" varchar
  );
  
  CREATE TABLE "performance_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_title" varchar DEFAULT 'My Background',
  	"background_content" jsonb,
  	"cta_title" varchar DEFAULT 'Commission & Collaboration',
  	"cta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "film_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_title" varchar DEFAULT 'Screening Inquiries',
  	"cta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "cv_sections_entries" ADD COLUMN "year_end" numeric;
  ALTER TABLE "cv_sidebar_sections_entries" ADD COLUMN "year_end" numeric;
  ALTER TABLE "cv_sections_entries_pieces" ADD CONSTRAINT "cv_sections_entries_pieces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv_sections_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cv_sidebar_sections_entries_pieces" ADD CONSTRAINT "cv_sidebar_sections_entries_pieces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv_sidebar_sections_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "performance_page_affiliations" ADD CONSTRAINT "performance_page_affiliations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."performance_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cv_sections_entries_pieces_order_idx" ON "cv_sections_entries_pieces" USING btree ("_order");
  CREATE INDEX "cv_sections_entries_pieces_parent_id_idx" ON "cv_sections_entries_pieces" USING btree ("_parent_id");
  CREATE INDEX "cv_sidebar_sections_entries_pieces_order_idx" ON "cv_sidebar_sections_entries_pieces" USING btree ("_order");
  CREATE INDEX "cv_sidebar_sections_entries_pieces_parent_id_idx" ON "cv_sidebar_sections_entries_pieces" USING btree ("_parent_id");
  CREATE INDEX "performance_page_affiliations_order_idx" ON "performance_page_affiliations" USING btree ("_order");
  CREATE INDEX "performance_page_affiliations_parent_id_idx" ON "performance_page_affiliations" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cv_sections_entries_pieces" CASCADE;
  DROP TABLE "cv_sidebar_sections_entries_pieces" CASCADE;
  DROP TABLE "performance_page_affiliations" CASCADE;
  DROP TABLE "performance_page" CASCADE;
  DROP TABLE "film_page" CASCADE;
  ALTER TABLE "cv_sections_entries" DROP COLUMN "year_end";
  ALTER TABLE "cv_sidebar_sections_entries" DROP COLUMN "year_end";`)
}
