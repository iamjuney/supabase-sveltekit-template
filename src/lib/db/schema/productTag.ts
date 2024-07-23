import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const productTag = pgTable('product_tags', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique()
});
