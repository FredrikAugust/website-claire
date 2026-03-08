import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_works_category" AS ENUM('installation', 'film', 'performance');
  CREATE TABLE "works_collaborators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL
  );
  
  CREATE TABLE "works_performers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "works_screenings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"festival" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"year" numeric NOT NULL
  );
  
  CREATE TABLE "works_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "works_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "works" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_works_category" NOT NULL,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"year" numeric NOT NULL,
  	"medium" varchar,
  	"duration" varchar,
  	"subtitle" varchar,
  	"description" jsonb,
  	"venue" varchar,
  	"venue_location" varchar,
  	"hero_image_id" integer,
  	"thumbnail_image_id" integer,
  	"vimeo_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"artist_name" varchar DEFAULT 'Claire Foody' NOT NULL,
  	"artist_descriptor" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"vimeo_url" varchar,
  	"instagram_url" varchar,
  	"footer_bio" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"portrait_id" integer,
  	"headline" varchar,
  	"bio" jsonb,
  	"approach_title" varchar,
  	"approach_content" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cv_sections_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"venue" varchar,
  	"location" varchar
  );
  
  CREATE TABLE "cv_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "cv_sidebar_sections_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"details" varchar
  );
  
  CREATE TABLE "cv_sidebar_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "cv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_inquiry_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE IF EXISTS "installations_files" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "installations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "home_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "installations_files" CASCADE;
  DROP TABLE IF EXISTS "installations" CASCADE;
  DROP TABLE IF EXISTS "home_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_installations_fk";

  ALTER TABLE "home" DROP CONSTRAINT IF EXISTS "home_hero_image_id_media_id_fk";

  ALTER TABLE "home" DROP CONSTRAINT IF EXISTS "home_contact_image_id_media_id_fk";

  DROP INDEX IF EXISTS "payload_locked_documents_rels_installations_id_idx";
  DROP INDEX "home_hero_hero_image_idx";
  DROP INDEX "home_contact_contact_image_idx";
  ALTER TABLE "home" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "works_id" integer;
  ALTER TABLE "home" ADD COLUMN "hero_video_id" integer;
  ALTER TABLE "home" ADD COLUMN "hero_fallback_image_id" integer;
  ALTER TABLE "home" ADD COLUMN "hero_descriptor" varchar;
  ALTER TABLE "home" ADD COLUMN "about_practice_quote" varchar;
  ALTER TABLE "home" ADD COLUMN "about_practice_body" jsonb;
  ALTER TABLE "works_collaborators" ADD CONSTRAINT "works_collaborators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "works_performers" ADD CONSTRAINT "works_performers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "works_screenings" ADD CONSTRAINT "works_screenings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "works_gallery" ADD CONSTRAINT "works_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "works_gallery" ADD CONSTRAINT "works_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "works_files" ADD CONSTRAINT "works_files_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "works_files" ADD CONSTRAINT "works_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "works" ADD CONSTRAINT "works_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "works" ADD CONSTRAINT "works_thumbnail_image_id_media_id_fk" FOREIGN KEY ("thumbnail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cv_sections_entries" ADD CONSTRAINT "cv_sections_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cv_sections" ADD CONSTRAINT "cv_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cv_sidebar_sections_entries" ADD CONSTRAINT "cv_sidebar_sections_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv_sidebar_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cv_sidebar_sections" ADD CONSTRAINT "cv_sidebar_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_inquiry_categories" ADD CONSTRAINT "contact_inquiry_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "works_collaborators_order_idx" ON "works_collaborators" USING btree ("_order");
  CREATE INDEX "works_collaborators_parent_id_idx" ON "works_collaborators" USING btree ("_parent_id");
  CREATE INDEX "works_performers_order_idx" ON "works_performers" USING btree ("_order");
  CREATE INDEX "works_performers_parent_id_idx" ON "works_performers" USING btree ("_parent_id");
  CREATE INDEX "works_screenings_order_idx" ON "works_screenings" USING btree ("_order");
  CREATE INDEX "works_screenings_parent_id_idx" ON "works_screenings" USING btree ("_parent_id");
  CREATE INDEX "works_gallery_order_idx" ON "works_gallery" USING btree ("_order");
  CREATE INDEX "works_gallery_parent_id_idx" ON "works_gallery" USING btree ("_parent_id");
  CREATE INDEX "works_gallery_image_idx" ON "works_gallery" USING btree ("image_id");
  CREATE INDEX "works_files_order_idx" ON "works_files" USING btree ("_order");
  CREATE INDEX "works_files_parent_id_idx" ON "works_files" USING btree ("_parent_id");
  CREATE INDEX "works_files_file_idx" ON "works_files" USING btree ("file_id");
  CREATE UNIQUE INDEX "works_slug_idx" ON "works" USING btree ("slug");
  CREATE INDEX "works_sort_order_idx" ON "works" USING btree ("sort_order");
  CREATE INDEX "works_hero_image_idx" ON "works" USING btree ("hero_image_id");
  CREATE INDEX "works_thumbnail_image_idx" ON "works" USING btree ("thumbnail_image_id");
  CREATE INDEX "works_updated_at_idx" ON "works" USING btree ("updated_at");
  CREATE INDEX "works_created_at_idx" ON "works" USING btree ("created_at");
  CREATE INDEX "about_portrait_idx" ON "about" USING btree ("portrait_id");
  CREATE INDEX "cv_sections_entries_order_idx" ON "cv_sections_entries" USING btree ("_order");
  CREATE INDEX "cv_sections_entries_parent_id_idx" ON "cv_sections_entries" USING btree ("_parent_id");
  CREATE INDEX "cv_sections_order_idx" ON "cv_sections" USING btree ("_order");
  CREATE INDEX "cv_sections_parent_id_idx" ON "cv_sections" USING btree ("_parent_id");
  CREATE INDEX "cv_sidebar_sections_entries_order_idx" ON "cv_sidebar_sections_entries" USING btree ("_order");
  CREATE INDEX "cv_sidebar_sections_entries_parent_id_idx" ON "cv_sidebar_sections_entries" USING btree ("_parent_id");
  CREATE INDEX "cv_sidebar_sections_order_idx" ON "cv_sidebar_sections" USING btree ("_order");
  CREATE INDEX "cv_sidebar_sections_parent_id_idx" ON "cv_sidebar_sections" USING btree ("_parent_id");
  CREATE INDEX "contact_inquiry_categories_order_idx" ON "contact_inquiry_categories" USING btree ("_order");
  CREATE INDEX "contact_inquiry_categories_parent_id_idx" ON "contact_inquiry_categories" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_works_fk" FOREIGN KEY ("works_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_fallback_image_id_media_id_fk" FOREIGN KEY ("hero_fallback_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_works_id_idx" ON "payload_locked_documents_rels" USING btree ("works_id");
  CREATE INDEX "home_hero_hero_video_idx" ON "home" USING btree ("hero_video_id");
  CREATE INDEX "home_hero_hero_fallback_image_idx" ON "home" USING btree ("hero_fallback_image_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "installations_id";
  ALTER TABLE "home" DROP COLUMN "hero_description";
  ALTER TABLE "home" DROP COLUMN "hero_image_id";
  ALTER TABLE "home" DROP COLUMN "about_me_description";
  ALTER TABLE "home" DROP COLUMN "contact_phone";
  ALTER TABLE "home" DROP COLUMN "contact_email";
  ALTER TABLE "home" DROP COLUMN "contact_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "installations_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "installations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"index" numeric DEFAULT 0,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"summary" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "works_collaborators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "works_performers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "works_screenings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "works_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "works_files" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cv_sections_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cv_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cv_sidebar_sections_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cv_sidebar_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cv" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_inquiry_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "works_collaborators" CASCADE;
  DROP TABLE "works_performers" CASCADE;
  DROP TABLE "works_screenings" CASCADE;
  DROP TABLE "works_gallery" CASCADE;
  DROP TABLE "works_files" CASCADE;
  DROP TABLE "works" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "cv_sections_entries" CASCADE;
  DROP TABLE "cv_sections" CASCADE;
  DROP TABLE "cv_sidebar_sections_entries" CASCADE;
  DROP TABLE "cv_sidebar_sections" CASCADE;
  DROP TABLE "cv" CASCADE;
  DROP TABLE "contact_inquiry_categories" CASCADE;
  DROP TABLE "contact" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_works_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_hero_video_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_hero_fallback_image_id_media_id_fk";
  
  DROP INDEX "payload_locked_documents_rels_works_id_idx";
  DROP INDEX "home_hero_hero_video_idx";
  DROP INDEX "home_hero_hero_fallback_image_idx";
  ALTER TABLE "home" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "installations_id" integer;
  ALTER TABLE "home" ADD COLUMN "hero_description" jsonb NOT NULL;
  ALTER TABLE "home" ADD COLUMN "hero_image_id" integer NOT NULL;
  ALTER TABLE "home" ADD COLUMN "about_me_description" jsonb NOT NULL;
  ALTER TABLE "home" ADD COLUMN "contact_phone" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN "contact_email" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN "contact_image_id" integer NOT NULL;
  ALTER TABLE "installations_files" ADD CONSTRAINT "installations_files_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "installations_files" ADD CONSTRAINT "installations_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."installations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "installations_files_order_idx" ON "installations_files" USING btree ("_order");
  CREATE INDEX "installations_files_parent_id_idx" ON "installations_files" USING btree ("_parent_id");
  CREATE INDEX "installations_files_file_idx" ON "installations_files" USING btree ("file_id");
  CREATE INDEX "installations_index_idx" ON "installations" USING btree ("index");
  CREATE INDEX "installations_updated_at_idx" ON "installations" USING btree ("updated_at");
  CREATE INDEX "installations_created_at_idx" ON "installations" USING btree ("created_at");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_media_id_idx" ON "home_rels" USING btree ("media_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_installations_fk" FOREIGN KEY ("installations_id") REFERENCES "public"."installations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_contact_image_id_media_id_fk" FOREIGN KEY ("contact_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_installations_id_idx" ON "payload_locked_documents_rels" USING btree ("installations_id");
  CREATE INDEX "home_hero_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home_contact_contact_image_idx" ON "home" USING btree ("contact_image_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "works_id";
  ALTER TABLE "home" DROP COLUMN "hero_video_id";
  ALTER TABLE "home" DROP COLUMN "hero_fallback_image_id";
  ALTER TABLE "home" DROP COLUMN "hero_descriptor";
  ALTER TABLE "home" DROP COLUMN "about_practice_quote";
  ALTER TABLE "home" DROP COLUMN "about_practice_body";
  DROP TYPE "public"."enum_works_category";`)
}
