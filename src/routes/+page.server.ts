import { getOrCreateUserProfile } from '$lib/auth/index.js';

export const load = async ({ locals }) => {
	const userProfile = await getOrCreateUserProfile(locals);

	return { userProfile };
};

export const actions = {
	// default: async ({ request, locals }) => {
	// 	const userProfile = await getOrCreateUserProfile(locals);
	// 	if (!userProfile) {
	// 		error(401, 'You need to be logged in!');
	// 	}
	// 	const schema = zfd.formData({
	// 		firstName: zfd.text(),
	// 		lastName: zfd.text(),
	// 		email: zfd.text()
	// 	});
	// 	const { data } = schema.safeParse(await request.formData());
	// 	if (!data) {
	// 		error(400, 'Invalid form data');
	// 	}
	// 	await db
	// 		.update(user)
	// 		.set({
	// 			firstName: data.firstName,
	// 			lastName: data.lastName,
	// 			email: data.email
	// 		})
	// 		.where(eq(user.id, userProfile.id));
	// 	return { success: true };
	// }
};
