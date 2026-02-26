<script lang="ts">
	import { fragments, type FragmentCategory, type FragmentDifficulty } from '$lib/language/data';
	import FragmentCard from '$lib/ui/FragmentCard.svelte';
	import NavBar from '$lib/ui/NavBar.svelte';
</script>

<!-- Header -->
<header class="sticky z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
	<div class="mx-auto flex max-w-5xl items-center space-x-2 px-2 py-2 sm:px-4 md:px-8 md:py-4">
		<div class="rounded-lg bg-primary/10 p-2 leading-0 text-primary">
			<span class="iconify solar--music-note-bold-duotone"></span>
		</div>
		<h1 class="text-2xl font-bold tracking-tight text-foreground">
			Jazz<span class="text-primary">Language</span>
		</h1>
	</div>
</header>

<!-- Main content -->
<main
	class="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl overflow-y-auto px-2 pt-2 pb-20 sm:px-4 sm:pt-4 md:px-8 md:pt-8"
>
	<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
		{#each fragments as fragment}
			<FragmentCard {fragment} />
		{/each}
	</div>
</main>

<!-- Bottom nav -->
<NavBar />
