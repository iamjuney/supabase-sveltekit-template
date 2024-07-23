import { relations } from 'drizzle-orm';
import { decimal, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { product } from './product';

export const productVariant = pgTable('product_variants', {
	id: serial('id').primaryKey(),
	productId: integer('product_id')
		.references(() => product.id)
		.notNull(),
	name: text('name').notNull(),
	sku: text('sku').notNull().unique(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
	stockQuantity: integer('stock_quantity').notNull()
});

export const productVariantRelations = relations(productVariant, ({ one }) => ({
	product: one(product, {
		fields: [productVariant.productId],
		references: [product.id]
	})
}));
