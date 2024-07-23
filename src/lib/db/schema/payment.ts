import { relations } from 'drizzle-orm';
import { decimal, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { order } from './order';

export const payment = pgTable('payments', {
	id: serial('id').primaryKey(),
	orderId: integer('order_id')
		.references(() => order.id)
		.notNull(),
	amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
	paymentMethod: text('payment_method').notNull(),
	transactionId: text('transaction_id'),
	status: text('status').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const paymentRelations = relations(payment, ({ one }) => ({
	order: one(order, {
		fields: [payment.orderId],
		references: [order.id]
	})
}));
