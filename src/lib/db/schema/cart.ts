import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, uuid } from 'drizzle-orm/pg-core';
import { cartItem } from './cartItem';
import { user } from './user';

export const cart = pgTable('carts', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => user.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const cartRelations = relations(cart, ({ one, many }) => ({
	user: one(user, {
		fields: [cart.userId],
		references: [user.id]
	}),
	items: many(cartItem)
}));
