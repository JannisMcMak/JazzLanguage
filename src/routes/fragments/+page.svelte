<script lang="ts">
	import { fragments, type FragmentCategory } from '$lib/language/data';
	import FragmentCard from '$lib/ui/FragmentCard.svelte';
	import { fragmentCategoryIcon } from '$lib/ui/FragmentCard.svelte';
	import NavBar from '$lib/ui/NavBar.svelte';

	type FilterValue = FragmentCategory | 'all';
	const filterIcons: Record<FilterValue, string> = {
		...fragmentCategoryIcon,
		all: 'solar--filter-bold-duotone'
	};
	const filterLabels: Record<FilterValue, string> = {
		all: 'All',
		scales: 'Scales',
		arpeggios: 'Arpeggios',
		vocabulary: 'Vocabulary',
		licks: 'Licks'
	};

	// Filter & search state
	let activeCategory = $state<FilterValue>('all');
	let searchQuery = $state('');
	let searchOpen = $state(false);
	let searchInput = $state<HTMLInputElement | null>(null);

	const filteredFragments = $derived(() => {
		let result = fragments;
		if (activeCategory !== 'all') {
			result = result.filter((f) => f.category === activeCategory);
		}
		if (searchQuery.trim()) {
			const q = searchQuery.trim().toLowerCase();
			result = result.filter(
				(f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
			);
		}
		return result;
	});

	function toggleSearch() {
		searchOpen = !searchOpen;
		if (searchOpen) {
			// Focus the input after DOM update
			setTimeout(() => searchInput?.focus(), 50);
		} else {
			searchQuery = '';
		}
	}

	function handleSearchBlur() {
		if (!searchQuery.trim()) {
			searchOpen = false;
		}
	}
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
	<!-- Filter & Search bar -->
	<div class="mb-2 flex w-full flex-wrap items-center gap-2 sm:mb-4 md:mb-8 md:justify-center">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="btn cursor-pointer justify-start! gap-1.5 overflow-hidden transition-all duration-300 ease-out"
			style="width: {searchOpen ? '220px' : '100px'};"
			onclick={() => !searchOpen && toggleSearch()}
		>
			<span class="iconify shrink-0 text-primary solar--magnifer-bold-duotone"></span>
			{#if searchOpen}
				<input
					bind:this={searchInput}
					bind:value={searchQuery}
					type="search"
					placeholder="Search…"
					class="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
					onblur={handleSearchBlur}
					onkeydown={(e) => e.key === 'Escape' && toggleSearch()}
				/>
				{#if searchQuery}
					<button
						aria-label="Clear search"
						class="flex shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
						onclick={(e) => {
							e.stopPropagation();
							searchQuery = '';
							searchInput?.focus();
						}}
					>
						<span class="iconify solar--close-circle-bold-duotone"></span>
					</button>
				{/if}
			{:else}
				<span class="text-nowrap">Search</span>
			{/if}
		</div>

		<!-- Category filter buttons -->
		{#each Object.keys(filterLabels) as rawFilter}
			{@const filter = rawFilter as FilterValue}
			<button
				class="btn"
				class:btn-primary={activeCategory === filter}
				onclick={() => {
					if (activeCategory === filter) activeCategory = 'all';
					else activeCategory = filter;
				}}
			>
				<span class="iconify {filterIcons[filter]}" class:text-primary={activeCategory !== filter}
				></span>
				<span>{filterLabels[filter]}</span>
			</button>
		{/each}
	</div>

	<!-- Fragment grid -->
	<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
		{#each filteredFragments() as fragment}
			<FragmentCard {fragment} />
		{/each}
	</div>
</main>

<!-- Bottom nav -->
<NavBar />
