import { db } from '$lib/db';
import { user } from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const getOrCreateUserProfile = async (locals: App.Locals) => {
	const { user: userData } = await locals.safeGetSession();
	if (!userData) return null;

	try {
		const findProfile = () =>
			db.query.user.findFirst({
				where: eq(user.id, userData.id)
			});

		let profile = await findProfile();

		if (!profile) {
			await db.insert(user).values({
				id: userData.id,
				firstName: '',
				lastName: '',
				email: userData.email ?? ''
			});

			profile = await findProfile();

			if (!profile) {
				throw new Error('Could not create profile');
			}
		}

		return profile;
	} catch (err) {
		console.error('Error in getOrCreateUserProfile:', err);
		error(500, err instanceof Error ? err.message : 'An unexpected error occurred');
	}
};
