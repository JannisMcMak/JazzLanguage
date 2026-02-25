<script lang="ts">
	import { page } from '$app/state';
	import ABCJS from 'abcjs';
	import { transposeNote, fragments } from '$lib/language/';

	const fragment = fragments.find((f) => f.id === page.params.fragmentID);

	let transposition = $state(8);

	$effect(() => {
		console.log(fragment?.music.abcNotation(transposition));
		ABCJS.renderAbc('abcjs', fragment!.music.abcNotation(transposition), {
			responsive: 'resize',
			staffwidth: 300,
			selectTypes: false,
			foregroundColor: 'var(--color-foreground)'
		});
	});
</script>

{#if !fragment}
	<p>Fragment not found</p>
{:else}
	<div
		class="relative mx-auto min-h-80 max-w-lg flex-1 rounded-xl border border-border bg-card p-4"
	>
		<div class="flex w-full flex-col items-center py-2">
			<span class="text-muted-foreground">Current Key</span>
			<h5 class="text-6xl font-bold text-primary">
				{transposeNote('C', transposition)}
			</h5>

			<div id="abcjs"></div>
		</div>
	</div>
	<div class="absolute bottom-20 left-1/2">
		<button
			class=" relative -left-1/2 mx-auto w-xs"
			onclick={() => (transposition = (transposition + 1) % 12)}>Next Key &rightarrow;</button
		>
	</div>
{/if}
