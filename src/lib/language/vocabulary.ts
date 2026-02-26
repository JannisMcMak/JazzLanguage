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
		const getScaleDegree = Scale.degrees(scale.name);
		const down = scale.notes.toReversed().toSpliced(-1);
		if (scaleLength === 6 || scaleLength === 8) {
			return [...scale.notes, getScaleDegree(scaleLength + 1), ...down];
		}
		return [
			...scale.notes,
			...[scaleLength + 1, scaleLength + 2, scaleLength + 1].map(getScaleDegree),
			...down
		];
	}

	static getEighthNoteGrouping(scale: Scale.Scale): number {
		if (scale.notes.length === 6 || scale.notes.length === 5) return 3;
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

		// Convert to ABC notation, tracking explicit accidentals per pitch class
		// so we can re-apply key-signature accidentals when a previous natural/accidental
		// has altered the expected pitch.
		const explicitAccidentals = new Map<string, string>(); // pitch letter -> last explicit accidental
		const abcNotes = notes.map((n) => {
			const abc = AbcNotation.scientificToAbcNotation(n);
			const noteInfo = Note.get(n);
			const pitchLetter = noteInfo.letter;
			const noteAcc = noteInfo.acc || '';

			// Check if this note is diatonic in the key scale
			const isDiatonic = keyScale.notes.some((scaleNote) => Note.get(scaleNote).pc === noteInfo.pc);

			if (isDiatonic) {
				const prevAcc = explicitAccidentals.get(pitchLetter);
				// Find the key-signature accidental for this pitch letter
				const keyScaleNote = keyScale.notes.find((sn) => Note.get(sn).letter === pitchLetter);
				const keyAcc = keyScaleNote ? Note.get(keyScaleNote).acc || '' : '';

				if (prevAcc !== undefined && prevAcc !== keyAcc) {
					// A previous explicit accidental altered this pitch letter,
					// so we must re-state the key-signature accidental explicitly
					explicitAccidentals.set(pitchLetter, keyAcc);
					if (!keyAcc) {
						// Key signature has no accidental -> add natural
						return '=' + abc.replace('_', '').replace('^', '');
					}
					// Keep the abc as-is (it already carries the correct accidental from scientificToAbcNotation)
					return abc;
				}
				// No conflict -> strip accidental, key signature handles it
				return abc.replace('_', '').replace('^', '');
			}

			// Note is not diatonic — track the explicit accidental
			if (!noteAcc) {
				// Natural note but not in key scale -> explicit natural
				explicitAccidentals.set(pitchLetter, '');
				return '=' + abc;
			}
			explicitAccidentals.set(pitchLetter, noteAcc);
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
