import { ChordType, Pcset, ScaleType } from 'tonal';

/**
 * Scales: maj, min...
 * Arpeggios: chord tones
 * Vocabulary: more complicated exercises, combined arpeggios & scales, triad inversions, enclosures...
 * Licks: solo lines (mostly over ii-V-I)
 */
export type FragmentCategory = 'scales' | 'arpeggios' | 'vocabulary' | 'licks';
export type FragmentDifficulty = 1 | 2 | 3;
export interface LanguageFragment {
	id: string;
	name: string;
	category: FragmentCategory;
	description: string;
	vocabulary: Pcset.Pcset;
	difficulty: FragmentDifficulty;
}

export const fragments: LanguageFragment[] = [
	// Scales
	{
		id: 'major-scale',
		name: 'Major Scale',
		category: 'scales',
		description: 'The fundamental major scale - the foundation of Western harmony',
		vocabulary: ScaleType.get('major'),
		difficulty: 1
	},
	{
		id: 'dorian-scale',
		name: 'Dorian Scale',
		category: 'scales',
		description: 'Minor scale with a raised 6th - essential for minor ii-V-i',
		vocabulary: ScaleType.get('dorian'),
		difficulty: 1
	},
	{
		id: 'mixolydian-scale',
		name: 'Mixolydian Scale',
		category: 'scales',
		description: 'Major scale with b7 - the dominant sound',
		vocabulary: ScaleType.get('mixolydian'),
		difficulty: 1
	},
	{
		id: 'lydian-scale',
		name: 'Lydian Scale',
		category: 'scales',
		description: 'Major scale with #4 - very bright',
		vocabulary: ScaleType.get('lydian'),
		difficulty: 1
	},
	{
		id: 'mixo-sharp11',
		name: 'Mixolydian #11',
		category: 'scales',
		description: 'Lydian dominant - adds tension with the #11',
		vocabulary: ScaleType.get('lydian b7'),
		difficulty: 2
	},
	{
		id: 'wt-scale',
		name: 'Whole Tone',
		category: 'scales',
		description: 'WT scale - most basic hexatonic scale',
		vocabulary: ScaleType.get('whole tone'),
		difficulty: 1
	},
	{
		id: 'wtht-scale',
		name: 'Whole/Half Tone',
		category: 'scales',
		description: 'WT/HT scale - the diminished sound',
		vocabulary: ScaleType.get('whole-half diminished'),
		difficulty: 2
	},
	{
		id: 'altered-scale',
		name: 'Altered Scale',
		category: 'scales',
		description: 'Melodic minor 7 - essential for altered dominants',
		vocabulary: ScaleType.get('altered'),
		difficulty: 2
	},
	{
		id: 'major-pentatonic',
		name: 'Major Pentatonic',
		category: 'scales',
		description: 'Five-note scale - clean and versatile',
		vocabulary: ScaleType.get('major pentatonic'),
		difficulty: 1
	},
	{
		id: 'minor-pentatonic',
		name: 'Minor Pentatonic',
		category: 'scales',
		description: 'Five-note scale - minor variant',
		vocabulary: ScaleType.get('minor pentatonic'),
		difficulty: 1
	},
	{
		id: 'blues-scale',
		name: 'Blues Scale',
		category: 'scales',
		description: 'Minor Pentatonic with blue note - foundation for blues',
		vocabulary: ScaleType.get('blues'),
		difficulty: 1
	},
	{
		id: 'bebop-dominant',
		name: 'Bebop Dominant',
		category: 'scales',
		description: 'Mixolydian with passing tone - keeps chord tones on beats',
		vocabulary: ScaleType.get('bebop'),
		difficulty: 2
	},
	{
		id: 'bebop-major',
		name: 'Bebop Major',
		category: 'scales',
		description: 'Major with passing tone - major sixth diminished',
		vocabulary: ScaleType.get('bebop major'),
		difficulty: 2
	},
	// Arpeggios
	{
		id: 'major-arp',
		name: 'Major Arpeggio',
		category: 'arpeggios',
		description: 'Root, 3rd, 5th - the bright major sound',
		vocabulary: ChordType.get('major'),
		difficulty: 1
	},
	{
		id: 'minor-arp',
		name: 'Minor Arpeggio',
		category: 'arpeggios',
		description: 'Root, b3, 5th - the ii chord sound',
		vocabulary: ChordType.get('minor'),
		difficulty: 1
	},
	{
		id: 'aug-arp',
		name: 'Augmented Arpeggio',
		category: 'arpeggios',
		description: 'Root, 3rd, #5th - the augmented sound',
		vocabulary: ChordType.get('augmented'),
		difficulty: 2
	},
	{
		id: 'half-dim-arp',
		name: 'Half-Diminished Arpeggio',
		category: 'arpeggios',
		description: 'Root, b3, b5, b7 - the ii in minor ii-V-is',
		vocabulary: ChordType.get('half-diminished'),
		difficulty: 2
	},
	{
		id: 'dim-arp',
		name: 'Fully Diminished Arpeggio',
		category: 'arpeggios',
		description: 'Root, b3, b5, etc. - stacked minor 3rds',
		vocabulary: ChordType.get('diminished'),
		difficulty: 2
	},
	// Vocabulary
	{
		id: 'enclosures',
		name: 'Enclosure Pattern',
		category: 'vocabulary',
		description: 'Approach the root from above and below',
		vocabulary: Pcset.get([]),
		difficulty: 2
	},
	// Licks
	{
		id: 'honeysuckle-lick',
		name: 'Honeysuckle Rose Lick',
		category: 'licks',
		description: 'Classic bebop vocabulary from the standard',
		vocabulary: Pcset.get([]),
		difficulty: 3
	},
	{
		id: 'simple-251-major',
		name: 'Simple ii-V-I (Major)',
		category: 'licks',
		description: 'Basic major ii-V-I resolution pattern',
		vocabulary: Pcset.get([]),
		difficulty: 2
	},
	{
		id: 'coltrane-pattern-maj',
		name: 'Coltrane Pattern Major',
		category: 'licks',
		description: '1-2-3-5 melodic cell - classic Trane vocabulary',
		vocabulary: Pcset.get([]),
		difficulty: 2
	},
	{
		id: 'coltrane-pattern-min',
		name: 'Coltrane Pattern Minor',
		category: 'licks',
		description: '1-b3-4-5 melodic cell - classic Trane vocabulary',
		vocabulary: Pcset.get([]),
		difficulty: 2
	}
];
