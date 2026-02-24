<script lang="ts">
	import { fragments, type FragmentCategory, type FragmentDifficulty } from '$lib/data';
	import { Badge, Button, Card } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';

	const fragmentCategoryLabel: Record<FragmentCategory, string> = {
		scales: 'Scale',
		arpeggios: 'Arpeggio',
		licks: 'Lick'
	};

	const fragmentDifficultyLabel: Record<FragmentDifficulty, string> = {
		1: 'Easy',
		2: 'Medium',
		3: 'Hard'
	};
	const fragmentDifficultyColor: Record<FragmentDifficulty, ComponentProps<typeof Badge>['color']> =
		{
			1: 'green',
			2: 'yellow',
			3: 'pink'
		};
</script>

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
	{#each fragments as fragment}
		<Card
			href="/{fragment.id}"
			class="w-full max-w-none p-4 sm:p-6 md:p-8 hover:[&_h5]:text-primary-600!"
		>
			<div class="mb-2 flex w-full items-center justify-between">
				<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{fragment.name}
				</h5>
				<div>
					<Badge border color={fragmentDifficultyColor[fragment.difficulty]}>
						{fragmentDifficultyLabel[fragment.difficulty]}
					</Badge>
				</div>
			</div>
			<p class="leading-tight font-normal text-gray-700 dark:text-gray-300">
				{fragment.description}
			</p>
			<p class="mt-2 text-sm font-normal text-gray-600 uppercase dark:text-gray-400">
				{fragmentCategoryLabel[fragment.category]}
				<span>•</span>
				{fragment.notes.length} Notes
			</p>
		</Card>
	{/each}
</div>
