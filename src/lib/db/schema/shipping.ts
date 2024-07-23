import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { order } from './order';

export const shipping = pgTable('shipping', {
	id: serial('id').primaryKey(),
	orderId: integer('order_id')
		.references(() => order.id)
		.notNull(),
	method: text('method').notNull(),
	trackingNumber: text('tracking_number'),
	status: text('status').notNull(),
	estimatedDelivery: timestamp('estimated_delivery'),
	actualDelivery: timestamp('actual_delivery')
});

export const shippingRelations = relations(shipping, ({ one }) => ({
	order: one(order, {
		fields: [shipping.orderId],
		references: [order.id]
	})
}));
