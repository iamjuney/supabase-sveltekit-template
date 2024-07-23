import { relations } from 'drizzle-orm';
import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { product } from './product';
import { wishlist } from './wishlist';

export const wishlistItem = pgTable('wishlist_items', {
	id: serial('id').primaryKey(),
	wishlistId: integer('wishlist_id')
		.references(() => wishlist.id)
		.notNull(),
	productId: integer('product_id')
		.references(() => product.id)
		.notNull()
});

export const wishlistItemRelations = relations(wishlistItem, ({ one }) => ({
	wishlist: one(wishlist, {
		fields: [wishlistItem.wishlistId],
		references: [wishlist.id]
	}),
	product: one(product, {
		fields: [wishlistItem.productId],
		references: [product.id]
	})
}));
