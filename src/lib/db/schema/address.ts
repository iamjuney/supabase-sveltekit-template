import { relations } from 'drizzle-orm';
import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';
import { user } from './user';

export const address = pgTable('addresses', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => user.id)
		.notNull(),
	type: text('type').notNull(),
	streetAddress: text('street_address').notNull(),
	city: text('city').notNull(),
	state: text('state').notNull(),
	country: text('country').notNull(),
	postalCode: text('postal_code').notNull()
});

export const addressRelations = relations(address, ({ one }) => ({
	user: one(user, {
		fields: [address.userId],
		references: [user.id]
	})
}));
