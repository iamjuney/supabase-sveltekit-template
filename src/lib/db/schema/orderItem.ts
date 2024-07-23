import { relations } from 'drizzle-orm';
import { decimal, integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { order } from './order';
import { product } from './product';

export const orderItem = pgTable('order_items', {
	id: serial('id').primaryKey(),
	orderId: integer('order_id')
		.references(() => order.id)
		.notNull(),
	productId: integer('product_id')
		.references(() => product.id)
		.notNull(),
	quantity: integer('quantity').notNull(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull()
});

export const orderItemRelations = relations(orderItem, ({ one }) => ({
	order: one(order, {
		fields: [orderItem.orderId],
		references: [order.id]
	}),
	product: one(product, {
		fields: [orderItem.productId],
		references: [product.id]
	})
}));
