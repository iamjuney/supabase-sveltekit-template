import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { address } from './address';
import { cart } from './cart';
import { order } from './order';
import { review } from './review';
import { wishlist } from './wishlist';

export const user = pgTable('users', {
	id: uuid('id').primaryKey(),
	email: text('email').notNull().unique(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const userRelations = relations(user, ({ many }) => ({
	orders: many(order),
	addresses: many(address),
	carts: many(cart),
	reviews: many(review),
	wishlists: many(wishlist)
}));
