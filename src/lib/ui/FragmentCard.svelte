<script lang="ts" module>
	export const fragmentCategoryIcon: Record<FragmentCategory, string> = {
		scales: 'solar--notebook-bookmark-bold-duotone',
		arpeggios: 'solar--layers-bold-duotone',
		vocabulary: 'solar--magic-stick-bold-duotone',
		licks: 'solar--microphone-2-bold-duotone'
	};

	const fragmentDifficultyLabel: Record<FragmentDifficulty, string> = {
		1: 'Easy',
		2: 'Medium',
		3: 'Hard'
	};
	const fragmentDifficultyClasses = [
		'',
		'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30',
		'bg-amber-100 text-amber-900  border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
		'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30'
	];
</script>

<script lang="ts">
	import {
		type FragmentCategory,
		type FragmentDifficulty,
		type LanguageFragment
	} from '$lib/language/data';
	import { twMerge } from 'tailwind-merge';

	let { fragment }: { fragment: LanguageFragment } = $props();
</script>

<a
	href="/fragments/{fragment.id}"
	class="group relative w-full rounded-xl border border-border bg-card p-5 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
>
	<div
		class="absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
	></div>

	<div class="mb-3 flex items-start justify-between">
		<div class="rounded-lg bg-primary/10 p-2 leading-0 text-primary">
			<span class="iconify {fragmentCategoryIcon[fragment.category]}"></span>
		</div>
		<div
			class={twMerge(
				'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
				'border-border bg-input/30 text-xs text-foreground [a&]:hover:bg-muted [a&]:hover:text-muted-foreground',
				fragmentDifficultyClasses[fragment.difficulty]
			)}
		>
			{fragmentDifficultyLabel[fragment.difficulty]}
		</div>
	</div>

	<h5 class="mb-2 text-xl font-bold tracking-tight">
		{fragment.name}
	</h5>
	<div class="text-muted-foreground">
		<p class="leading-tight">
			{fragment.description}
		</p>
	</div>
</a>
