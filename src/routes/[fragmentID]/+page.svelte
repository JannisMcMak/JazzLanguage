<script lang="ts">
	import { page } from '$app/state';
	import { fragments } from '$lib/data';
	import { Button, Card } from 'flowbite-svelte';
	import { CaretRightSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import ABCJS from 'abcjs';

	const abc = `
    K:C\n|: CDEF GABc | dcBA GFED :|
`;

	const fragment = fragments.find((f) => f.id === page.params.fragmentID);

	onMount(() => {
		ABCJS.renderAbc('abcjs', abc, {
			responsive: 'resize',
			staffwidth: 300,
			selectTypes: false,
			foregroundColor: document.documentElement.classList.contains('dark')
				? 'var(--color-gray-100)'
				: 'var(--color-gray-800)'
		});
	});
</script>

{#if !fragment}
	<p>Fragment not found</p>
{:else}
	<Card class="mx-auto min-h-80 max-w-lg flex-1 bg-gray-200 dark:bg-gray-600">
		<div class="flex w-full flex-col items-center py-2">
			<span class="text-gray-700 dark:text-gray-300">Key: </span>
			<h5 class="text-5xl font-bold text-primary-600 dark:text-primary-500">C</h5>

			<div id="abcjs"></div>
		</div>
	</Card>
	<div class="absolute bottom-20 left-1/2">
		<Button size="xl" class=" relative -left-1/2 mx-auto w-xs">Next Key <CaretRightSolid /></Button>
	</div>
{/if}
