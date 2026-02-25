<script lang="ts">
	import { page } from '$app/state';
	import ABCJS from 'abcjs';
	import { pitchClassFromTransposition, fragments } from '$lib/language/';

	const fragment = fragments.find((f) => f.id === page.params.fragmentID);

	const transpositionOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	let transposition = $state(0);
	const transpositionIndex = $derived(transpositionOrder.indexOf(transposition));

	$effect(() => {
		console.log(fragment?.vocabulary.abcNotation(transposition));
		ABCJS.renderAbc('abcjs', fragment!.vocabulary.abcNotation(transposition), {
			responsive: 'resize',
			staffwidth: 300,
			selectTypes: false,
			foregroundColor: 'var(--color-foreground)',
			paddingleft: 0,
			paddingright: 0
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
			<div class="flex w-full justify-between">
				<div class="flex flex-col items-center">
					<span class="text-xs text-muted-foreground">Prev.</span>
					<h5 class="text-3xl font-bold text-primary">
						{#if transpositionIndex === 0}
							-
						{:else}
							{pitchClassFromTransposition(transpositionOrder[transpositionIndex - 1])}
						{/if}
					</h5>
				</div>
				<div class="flex flex-col items-center">
					<span class="text-muted-foreground">Current Key</span>
					<h5 class="text-6xl font-bold text-primary">
						{pitchClassFromTransposition(transposition)}
					</h5>
				</div>
				<div class="flex flex-col items-center">
					<span class="text-xs text-muted-foreground">Next</span>
					<h5 class="text-3xl font-bold text-primary">
						{#if transpositionIndex === transpositionOrder.length - 1}
							-
						{:else}
							{pitchClassFromTransposition(transpositionOrder[transpositionIndex + 1])}
						{/if}
					</h5>
				</div>
			</div>

			<div id="abcjs"></div>
		</div>
	</div>
	<div class="absolute bottom-20 left-1/2 w-full max-w-sm">
		<div class="relative -left-1/2 mx-auto flex w-full gap-2 px-2">
			<button
				class="btn h-12! text-xl"
				onclick={() => (transposition = transpositionOrder[transpositionIndex - 1])}
				disabled={transpositionIndex === 0}
			>
				<span class="text-md mr-1 iconify solar--double-alt-arrow-left-bold-duotone"></span>
				Previous
			</button>
			<button
				class="btn btn-primary h-12! w-full flex-1 text-xl font-bold"
				onclick={() => (transposition = transpositionOrder[transpositionIndex + 1])}
				disabled={transpositionIndex === transpositionOrder.length - 1}
			>
				Next Key
				<span class="text-md ml-1 iconify solar--double-alt-arrow-right-bold-duotone"></span>
			</button>
		</div>
	</div>
{/if}
