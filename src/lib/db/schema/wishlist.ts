import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './user';
import { wishlistItem } from './wishlistItem';

export const wishlist = pgTable('wishlists', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => user.id)
		.notNull(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const wishlistRelations = relations(wishlist, ({ one, many }) => ({
	user: one(user, {
		fields: [wishlist.userId],
		references: [user.id]
	}),
	items: many(wishlistItem)
}));
