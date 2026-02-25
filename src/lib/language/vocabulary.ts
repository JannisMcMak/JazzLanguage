import { AbcNotation, Note, Scale, ScaleType } from 'tonal';

const PITCH_CLASSES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/** Get the pitch class from the number of semitones relative to C. */
export const pitchClassFromTransposition = (semitones: number): string => {
	return PITCH_CLASSES[semitones % 12];
};

export class Vocabulary {
	private scaleType: ScaleType.ScaleType;

	constructor(scale: ScaleType.ScaleType) {
		this.scaleType = scale;
	}

	static getStartingOctave(tonic: string): number {
		const transposition = PITCH_CLASSES.indexOf(tonic);
		return transposition < 9 ? 4 : 3;
	}

	static constructScaleExercise(scale: Scale.Scale): string[] {
		const scaleLength = scale.notes.length;
		return [
			...scale.notes,
			...[scaleLength + 1, scaleLength + 2, scaleLength + 1].map(Scale.degrees(scale.name)),
			...scale.notes.reverse().toSpliced(-1)
		];
	}

	static getEighthNoteGrouping(scale: Scale.Scale): number {
		if (scale.notes.length === 5) return 3;
		return 4;
	}

	abcNotation(transposition: number): string {
		const tonic = pitchClassFromTransposition(transposition);
		const keyScale = Scale.get(tonic + Vocabulary.getStartingOctave(tonic) + ' major');
		const scale = Scale.get(
			tonic + Vocabulary.getStartingOctave(tonic) + ' ' + this.scaleType.name
		);

		// Construct exercise
		const notes = Vocabulary.constructScaleExercise(scale);

		// Convert to ABC notation
		const abcNotes = notes.map((n) => {
			const abc = AbcNotation.scientificToAbcNotation(n);
			for (const scaleNote of keyScale.notes) {
				if (Note.get(scaleNote).pc === Note.get(n).pc) {
					// Note is diatonic in the scale -> No explicit accidental needed
					return abc.replace('_', '').replace('^', '');
				}
			}
			// Note is not diatonic
			if (!Note.get(n).acc) {
				// Add explicit natural sign
				return '=' + abc;
			}
			return abc;
		});

		// Group notes based on the length of the scale
		const grouping = Vocabulary.getEighthNoteGrouping(scale);
		const abcString = abcNotes
			.map((_, i) => (i % grouping === 0 ? abcNotes.slice(i, i + grouping) : null))
			.filter((n) => n !== null)
			.map((n) => n!.join(''))
			.join(' ');

		return 'K: ' + tonic + '\n' + abcString;
	}
}
