import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase } }) => {
	try {
		await supabase.auth.signOut();
	} catch (error) {
		console.error('Failed to sign out', error as Error);
	}

	redirect(307, '/');
};
