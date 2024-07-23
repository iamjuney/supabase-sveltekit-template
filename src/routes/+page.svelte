<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();

	let firstName = $state<string | null>('');
	let lastName = $state<string | null>('');
	let email = $state('');

	$effect(() => {
		if (data.userProfile) {
			firstName = data.userProfile.firstName;
			lastName = data.userProfile.lastName;
			email = data.userProfile.email;
		}
	});
</script>

{#if data.userProfile}
	<Button href="/auth/logout">logout</Button>
{:else}
	<Button href="/auth/login/github">Login to the site!</Button>
{/if}
