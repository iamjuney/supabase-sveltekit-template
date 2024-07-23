import { boolean, decimal, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const coupon = pgTable('coupons', {
	id: serial('id').primaryKey(),
	code: text('code').notNull().unique(),
	discountType: text('discount_type').notNull(),
	discountValue: decimal('discount_value', { precision: 10, scale: 2 }).notNull(),
	validFrom: timestamp('valid_from').notNull(),
	validTo: timestamp('valid_to').notNull(),
	isActive: boolean('is_active').notNull().default(true)
});
