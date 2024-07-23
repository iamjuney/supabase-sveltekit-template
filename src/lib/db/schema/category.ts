import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { product } from './product';

export const category = pgTable('categories', {
	id: serial('id').primaryKey(),
	name: text('name').notNull()
});

export const categoryRelations = relations(category, ({ many }) => ({
	products: many(product)
}));
