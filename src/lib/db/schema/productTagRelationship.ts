import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, uniqueIndex } from 'drizzle-orm/pg-core';
import { product } from './product';
import { productTag } from './productTag';

export const productTagRelationship = pgTable(
	'product_tag_relationships',
	{
		id: serial('id').primaryKey(),
		productId: integer('product_id')
			.references(() => product.id)
			.notNull(),
		tagId: integer('tag_id')
			.references(() => productTag.id)
			.notNull()
	},
	(table) => {
		return {
			unq: uniqueIndex('product_tag_unique').on(table.productId, table.tagId)
		};
	}
);

export const productTagRelationshipRelations = relations(productTagRelationship, ({ one }) => ({
	product: one(product, {
		fields: [productTagRelationship.productId],
		references: [product.id]
	}),
	tag: one(productTag, {
		fields: [productTagRelationship.tagId],
		references: [productTag.id]
	})
}));
