<script lang="ts">
	import { page } from '$app/state';
	import ABCJS from 'abcjs';
	import { pitchClassFromTransposition, fragments } from '$lib/language/';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const fragment = fragments.find((f) => f.id === page.params.fragmentID);

	// Order of keys in which the fragment will be presented
	const transpositionOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	// Current transposition (current key)
	let transposition = $state(0);
	// Current position in the transposition order
	const transpositionIndex = $derived(transpositionOrder.indexOf(transposition));

	// Track direction: +1 = going next (slide left), -1 = going previous (slide right)
	let direction = $state(1);
	// Key used to force re-mount of the animated element on change
	let animKey = $state(0);

	function goNext() {
		direction = 1;
		animKey++;
		transposition = transpositionOrder[transpositionIndex + 1];
	}

	function goPrev() {
		direction = -1;
		animKey++;
		transposition = transpositionOrder[transpositionIndex - 1];
	}

	$effect(() => {
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
		class="relative mx-auto flex min-h-80 max-w-lg flex-1 flex-col justify-between rounded-xl border border-border bg-card p-2"
	>
		<div class="flex w-full justify-between p-4">
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

			<!-- Animated current key -->
			<div class="flex flex-col items-center">
				<span class="text-muted-foreground">Current Key</span>
				<div class="relative h-20 w-24 overflow-hidden">
					{#key animKey}
						<h5
							class="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary"
							in:fly={{ x: direction * 60, duration: 280, easing: cubicOut }}
							out:fly={{ x: -direction * 60, duration: 200, easing: cubicOut }}
						>
							{pitchClassFromTransposition(transposition)}
						</h5>
					{/key}
				</div>
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

		<!-- Animated sheet music -->
		<div id="abcjs"></div>
	</div>
	<div class="absolute bottom-20 left-1/2 w-full max-w-sm">
		<div class="relative -left-1/2 mx-auto flex w-full gap-2 px-2">
			<button class="btn h-12! text-xl" onclick={goPrev} disabled={transpositionIndex === 0}>
				<span class="text-md mr-1 iconify solar--double-alt-arrow-left-bold-duotone"></span>
				Previous
			</button>
			<button
				class="btn btn-primary h-12! w-full flex-1 text-xl font-bold"
				onclick={goNext}
				disabled={transpositionIndex === transpositionOrder.length - 1}
			>
				Next Key
				<span class="text-md ml-1 iconify solar--double-alt-arrow-right-bold-duotone"></span>
			</button>
		</div>
	</div>
{/if}
