import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "works_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Installations, films, and performances',
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "performance_page" ADD COLUMN IF NOT EXISTS "heading" varchar DEFAULT 'Choreography and live works';
  ALTER TABLE "performance_page" ADD COLUMN IF NOT EXISTS "description" varchar;
  ALTER TABLE "film_page" ADD COLUMN IF NOT EXISTS "heading" varchar DEFAULT 'Moving image and choreography';
  ALTER TABLE "film_page" ADD COLUMN IF NOT EXISTS "description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "works_page" CASCADE;
  ALTER TABLE "performance_page" DROP COLUMN "heading";
  ALTER TABLE "performance_page" DROP COLUMN "description";
  ALTER TABLE "film_page" DROP COLUMN "heading";
  ALTER TABLE "film_page" DROP COLUMN "description";`)
}
