import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { number } from "motion";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits : integer()
});

export const sessionChartTable = pgTable("sessionChartTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId : varchar().notNull(),
  notes : text(),
  selectedDoctor : json(),
  conversation : json(),
  report : json(),
  createdBy : varchar().references(()=>usersTable.email),
  createdOn : varchar() 
});
