import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { product } from './product';

export const productImage = pgTable('product_images', {
	id: serial('id').primaryKey(),
	productId: integer('product_id')
		.references(() => product.id)
		.notNull(),
	imageUrl: text('image_url').notNull(),
	isDefault: boolean('is_default').notNull().default(false)
});

export const productImageRelations = relations(productImage, ({ one }) => ({
	product: one(product, {
		fields: [productImage.productId],
		references: [product.id]
	})
}));
