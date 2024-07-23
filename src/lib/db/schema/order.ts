import { relations } from 'drizzle-orm';
import { decimal, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { orderItem } from './orderItem';
import { payment } from './payment';
import { shipping } from './shipping';
import { user } from './user';

export const order = pgTable('orders', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => user.id)
		.notNull(),
	status: text('status').notNull(),
	totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const orderRelations = relations(order, ({ one, many }) => ({
	user: one(user, {
		fields: [order.userId],
		references: [user.id]
	}),
	orderItems: many(orderItem),
	payment: one(payment),
	shipping: one(shipping)
}));
