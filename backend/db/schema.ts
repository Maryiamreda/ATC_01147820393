import { relations } from "drizzle-orm";
import { date, integer, pgEnum, pgTable, primaryKey, timestamp, unique, varchar } from "drizzle-orm/pg-core";

export const eventTypeEnum = pgEnum("event-type", ["in person", "online"]);
export const eventCategoryEnum = pgEnum("event-category", [
  "music", 
  "educational",
  "business", 
  "technology", 
  "health",
  "arts",
  "sports",
  "entertainment",
  "science",
  "networking",
  "charity",
  "fashion",
  "cultural",

]);
const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
}


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),

});

export const usersRelations = relations(usersTable, ({ many }) => ({
  eventBookings: many(bookingsTable),

}));

export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image:varchar().notNull(),
  fees: integer().notNull(),
  description:varchar().notNull(),
  date:date().notNull(),
  location:varchar(),
  totalAudienceLimit:integer().notNull(),
  registrationDeadline: timestamp(),
  eventTypeId: integer().references(() => eventTypeTable.id).notNull(),
  categoryId: integer().references(() => eventCategoryTable.id).notNull(),
  organizerEmail: varchar({ length: 255 }).notNull().unique(),
  ...timestamps

});

export const eventsRelations = relations(eventsTable, ({one , many }) => ({
bookings: many(bookingsTable),
type:one(eventTypeTable ,{
  fields: [eventsTable.eventTypeId],
  references: [eventTypeTable.id],
}),
category: one(eventCategoryTable, {
  fields: [eventsTable.categoryId],
  references: [eventCategoryTable.id],
}),
}));

export const usersToEventsTable = pgTable("users_to_events",{
      userId: integer("user_id")
          .notNull()
          .references(() => usersTable.id),
      eventId: integer("event_id")
          .notNull()
          .references(() => eventsTable.id),
  },
  (t) => ({
      pk: primaryKey({ columns: [t.userId, t.eventId] })
  })
);

export const usersToEventsRelations  = relations(usersToEventsTable, ({ one }) => ({
  user: one(usersTable, {
      fields: [usersToEventsTable.userId],
      references: [usersTable.id],
  }),
  event: one(eventsTable, {
      fields: [usersToEventsTable.eventId],
      references: [eventsTable.id],
  }),
}));

export const eventTypeTable=pgTable("event_type", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type:eventTypeEnum().notNull()
})
export const eventTypeRelations = relations(eventTypeTable, ({many }) => ({
  events: many(eventsTable),
}));

export const eventCategoryTable = pgTable("event_category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: eventCategoryEnum().notNull()
});
export const eventCategoryRelations = relations(eventCategoryTable, ({ many }) => ({
  events: many(eventsTable),
}));

export const bookingsTable = pgTable("event_bookings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => usersTable.id).notNull(),
  eventId: integer().references(() => eventsTable.id).notNull(),
  quantity: integer().notNull().default(1), 
  ...timestamps
}, 
//this is used to prevent the same user from creating multiple booking records for the same event
(table) => ({
  uniqueUserEvent: unique().on(table.userId, table.eventId)
}));


export const eventBookingsRelations = relations(bookingsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [bookingsTable.userId],
    references: [usersTable.id],
  }),
  event: one(eventsTable, {
    fields: [bookingsTable.eventId],
    references: [eventsTable.id],
  }),
}));