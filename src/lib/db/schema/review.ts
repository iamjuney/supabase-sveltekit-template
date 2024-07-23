import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { product } from './product';
import { user } from './user';

export const review = pgTable('reviews', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => user.id)
		.notNull(),
	productId: integer('product_id')
		.references(() => product.id)
		.notNull(),
	rating: integer('rating').notNull(),
	comment: text('comment'),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const reviewRelations = relations(review, ({ one }) => ({
	user: one(user, {
		fields: [review.userId],
		references: [user.id]
	}),
	product: one(product, {
		fields: [review.productId],
		references: [product.id]
	})
}));
