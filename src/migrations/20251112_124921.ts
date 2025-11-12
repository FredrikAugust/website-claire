import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "installations_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  ALTER TABLE "installations" ADD COLUMN "index" numeric DEFAULT 0;
  ALTER TABLE "installations_files" ADD CONSTRAINT "installations_files_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "installations_files" ADD CONSTRAINT "installations_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."installations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "installations_files_order_idx" ON "installations_files" USING btree ("_order");
  CREATE INDEX "installations_files_parent_id_idx" ON "installations_files" USING btree ("_parent_id");
  CREATE INDEX "installations_files_file_idx" ON "installations_files" USING btree ("file_id");
  CREATE INDEX "installations_index_idx" ON "installations" USING btree ("index");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "installations_files" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "installations_files" CASCADE;
  DROP INDEX "installations_index_idx";
  ALTER TABLE "installations" DROP COLUMN "index";`)
}
