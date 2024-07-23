import { relations } from 'drizzle-orm';
import { decimal, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { cartItem } from './cartItem';
import { category } from './category';
import { orderItem } from './orderItem';
import { productImage } from './productImage';
import { productTagRelationship } from './productTagRelationship';
import { productVariant } from './productVariant';
import { review } from './review';
import { wishlistItem } from './wishlistItem';

export const product = pgTable('products', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
	stockQuantity: integer('stock_quantity').notNull(),
	categoryId: integer('category_id').references(() => category.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const productRelations = relations(product, ({ one, many }) => ({
	category: one(category, {
		fields: [product.categoryId],
		references: [category.id]
	}),
	orderItems: many(orderItem),
	cartItems: many(cartItem),
	reviews: many(review),
	wishlistItems: many(wishlistItem),
	images: many(productImage),
	variants: many(productVariant),
	tagRelationships: many(productTagRelationship)
}));
