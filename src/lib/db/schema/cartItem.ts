import { relations } from 'drizzle-orm';
import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { cart } from './cart';
import { product } from './product';

export const cartItem = pgTable('cart_items', {
	id: serial('id').primaryKey(),
	cartId: integer('cart_id')
		.references(() => cart.id)
		.notNull(),
	productId: integer('product_id')
		.references(() => product.id)
		.notNull(),
	quantity: integer('quantity').notNull()
});

export const cartItemRelations = relations(cartItem, ({ one }) => ({
	cart: one(cart, {
		fields: [cartItem.cartId],
		references: [cart.id]
	}),
	product: one(product, {
		fields: [cartItem.productId],
		references: [product.id]
	})
}));
