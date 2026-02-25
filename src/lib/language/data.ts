import { ScaleType } from 'tonal';
import { Vocabulary } from './vocabulary';

export type FragmentCategory = 'scales' | 'arpeggios' | 'licks';
export type FragmentDifficulty = 1 | 2 | 3;
export interface LanguageFragment {
	id: string;
	name: string;
	category: FragmentCategory;
	description: string;
	vocabulary: Vocabulary;
	difficulty: FragmentDifficulty;
}

export const fragments: LanguageFragment[] = [
	// Scales
	{
		id: 'major-scale',
		name: 'Major Scale',
		category: 'scales',
		description: 'The fundamental major scale - the foundation of Western harmony',
		vocabulary: new Vocabulary(ScaleType.get('major')),
		difficulty: 1
	},
	{
		id: 'dorian-scale',
		name: 'Dorian Scale',
		category: 'scales',
		description: 'Minor scale with a raised 6th - essential for minor ii-V-i',
		vocabulary: new Vocabulary(ScaleType.get('dorian')),
		difficulty: 1
	},
	{
		id: 'mixolydian-scale',
		name: 'Mixolydian Scale',
		category: 'scales',
		description: 'Major scale with b7 - the dominant sound',
		vocabulary: new Vocabulary(ScaleType.get('mixolydian')),
		difficulty: 1
	},
	{
		id: 'mixo-sharp11',
		name: 'Mixolydian #11',
		category: 'scales',
		description: 'Lydian dominant - adds tension with the #11',
		vocabulary: new Vocabulary(ScaleType.get('lydian b7')),
		difficulty: 2
	},
	{
		id: 'major-pentatonic',
		name: 'Major Pentatonic',
		category: 'scales',
		description: 'Five-note scale - clean and versatile',
		vocabulary: new Vocabulary(ScaleType.get('major pentatonic')),
		difficulty: 1
	},
	{
		id: 'minor-pentatonic',
		name: 'Minor Pentatonic',
		category: 'scales',
		description: 'Five-note scale - minor variant',
		vocabulary: new Vocabulary(ScaleType.get('minor pentatonic')),
		difficulty: 1
	},
	{
		id: 'blues-scale',
		name: 'Blues Scale',
		category: 'scales',
		description: 'Minor Pentatonic with blue note - foundation for blues',
		vocabulary: new Vocabulary(ScaleType.get('blues')),
		difficulty: 1
	},
	{
		id: 'bebop-dominant',
		name: 'Bebop Dominant',
		category: 'scales',
		description: 'Mixolydian with passing tone - keeps chord tones on beats',
		notes: [
			{ interval: 0, duration: 1 },
			{ interval: 2, duration: 1 },
			{ interval: 4, duration: 1 },
			{ interval: 5, duration: 1 },
			{ interval: 7, duration: 1 },
			{ interval: 9, duration: 1 },
			{ interval: 10, duration: 1 },
			{ interval: 11, duration: 1 }
		],
		difficulty: 2
	},
	{
		id: 'bebop-major',
		name: 'Bebop Major',
		category: 'scales',
		description: 'Major with passing tone - major sixth diminished',
		notes: [
			{ interval: 0, duration: 1 },
			{ interval: 2, duration: 1 },
			{ interval: 4, duration: 1 },
			{ interval: 5, duration: 1 },
			{ interval: 7, duration: 1 },
			{ interval: 9, duration: 1 },
			{ interval: 10, duration: 1 },
			{ interval: 11, duration: 1 }
		],
		difficulty: 2
	},
	// Arpeggios
	{
		id: 'major7-arp',
		name: 'Major 7 Arpeggio',
		category: 'arpeggios',
		description: 'Root, 3rd, 5th, 7th - the bright major sound',
		notes: [
			{ interval: 0, duration: 1 },
			{ interval: 4, duration: 1 },
			{ interval: 7, duration: 1 },
			{ interval: 11, duration: 1 },
			{ interval: 12, duration: 2 }
		],
		difficulty: 1
	},
	{
		id: 'minor7-arp',
		name: 'Minor 7 Arpeggio',
		category: 'arpeggios',
		description: 'Root, b3, 5th, b7 - the ii chord sound',
		notes: [
			{ interval: 0, duration: 1 },
			{ interval: 3, duration: 1 },
			{ interval: 7, duration: 1 },
			{ interval: 10, duration: 1 },
			{ interval: 12, duration: 2 }
		],
		difficulty: 1
	},
	{
		id: 'dom7-arp',
		name: 'Dominant 7 Arpeggio',
		category: 'arpeggios',
		description: 'Root, 3rd, 5th, b7 - the V chord tension',
		notes: [
			{ interval: 0, duration: 1 },
			{ interval: 4, duration: 1 },
			{ interval: 7, duration: 1 },
			{ interval: 10, duration: 1 },
			{ interval: 12, duration: 2 }
		],
		difficulty: 1
	},
	{
		id: 'half-dim-arp',
		name: 'Half Diminished Arpeggio',
		category: 'arpeggios',
		description: 'Root, b3, b5, b7 - minor ii in minor keys',
		notes: [
			{ interval: 0, duration: 1 },
			{ interval: 3, duration: 1 },
			{ interval: 6, duration: 1 },
			{ interval: 10, duration: 1 },
			{ interval: 12, duration: 2 }
		],
		difficulty: 2
	},
	// Licks
	{
		id: 'simple-251-major',
		name: 'Simple ii-V-I (Major)',
		category: 'licks',
		description: 'Basic major ii-V-I resolution pattern',
		notes: [
			{ interval: 2, duration: 0.5 },
			{ interval: 4, duration: 0.5 },
			{ interval: 5, duration: 0.5 },
			{ interval: 7, duration: 0.5 },
			{ interval: 9, duration: 0.5 },
			{ interval: 7, duration: 0.5 },
			{ interval: 5, duration: 0.5 },
			{ interval: 4, duration: 0.5 },
			{ interval: 2, duration: 0.5 },
			{ interval: 0, duration: 1.5 }
		],
		difficulty: 2
	},
	{
		id: 'enclosure-lick',
		name: 'Enclosure Pattern',
		category: 'licks',
		description: 'Approach the root from above and below',
		notes: [
			{ interval: 4, duration: 0.5 },
			{ interval: 2, duration: 0.5 },
			{ interval: 1, duration: 0.5 },
			{ interval: -1, duration: 0.5 },
			{ interval: 0, duration: 2 }
		],
		difficulty: 2
	},
	{
		id: 'coltrane-pattern',
		name: 'Coltrane Pattern',
		category: 'licks',
		description: '1-2-3-5 melodic cell - classic Trane vocabulary',
		notes: [
			{ interval: 0, duration: 0.5 },
			{ interval: 2, duration: 0.5 },
			{ interval: 4, duration: 0.5 },
			{ interval: 7, duration: 0.5 },
			{ interval: 4, duration: 0.5 },
			{ interval: 7, duration: 0.5 },
			{ interval: 9, duration: 0.5 },
			{ interval: 12, duration: 1.5 }
		],
		difficulty: 2
	},
	{
		id: 'honeysuckle-lick',
		name: 'Honeysuckle Rose Lick',
		category: 'licks',
		description: 'Classic bebop vocabulary from the standard',
		notes: [
			{ interval: 7, duration: 0.5 },
			{ interval: 9, duration: 0.5 },
			{ interval: 11, duration: 0.5 },
			{ interval: 12, duration: 0.5 },
			{ interval: 11, duration: 0.5 },
			{ interval: 9, duration: 0.5 },
			{ interval: 7, duration: 0.5 },
			{ interval: 4, duration: 0.5 },
			{ interval: 2, duration: 0.5 },
			{ interval: 0, duration: 1.5 }
		],
		difficulty: 3
	}
];
