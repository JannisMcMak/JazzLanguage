import { AbcNotation, Note, Pcset, Scale } from 'tonal';
import type { LanguageFragment } from './data';

const PITCH_CLASSES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const eigthNoteGroupings: Record<number, number> = {
	3: 3, // 3-note arpeggios
	4: 4, // 4-note arpeggios
	5: 3, // Pentatonic scales
	6: 3, // Hexatonic / blues scales
	7: 4, // "Normal" scales
	8: 4 // 8-note scales (e.g. bebop)
};

/** Get the pitch class from the number of semitones relative to C. */
export const pitchClassFromTransposition = (semitones: number): string => {
	return PITCH_CLASSES[semitones % 12];
};

function getStartingOctave(tonic: string): number {
	const transposition = PITCH_CLASSES.indexOf(tonic);
	return transposition < 9 ? 4 : 3;
}

function constructScaleExercise(pcSet: Pcset.Pcset, startingNote: string): string[] {
	const scaleName = startingNote + ' ' + pcSet.name;
	const scale = Scale.get(scaleName);
	const scaleLength = scale.notes.length;
	const getScaleDegree = Scale.degrees(scaleName);
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

function constructArpeggioExercise(pcSet: Pcset.Pcset, startingNote: string): string[] {
	const baseNotes = pcSet.intervals.map(Note.transposeFrom(startingNote));
	const octaveUp = pcSet.intervals.map(Note.transposeFrom(Note.transposeOctaves(startingNote, 1)));
	const topNote = Note.transposeOctaves(startingNote, 2);
	if (pcSet.name === 'diminished') {
		// Special case for dimished
		const fourthNote = Note.transpose(baseNotes[baseNotes.length - 1], '3m');
		return [
			...baseNotes,
			fourthNote,
			...octaveUp,
			...octaveUp.toSpliced(-1).toReversed(),
			fourthNote,
			...baseNotes.toReversed().toSpliced(-1)
		];
	}
	return [
		...baseNotes,
		...octaveUp,
		topNote,
		...octaveUp.toReversed(),
		...baseNotes.toReversed().toSpliced(-1)
	];
}

/**
 * Converts a list of scientific note strings to ABC notation.
 * @param notes A list of scientific note strings with octave digit, e.g., "C4".
 * @param keyScale An optional key signature scale to apply accidentals.
 * If a note is diatonic in the key scale, its accidental will not be explicitly specified.
 * If keyScale is not provided, all accidentals will be explicitly specified.
 */
function notesToAbc(notes: string[], keyScale?: Scale.Scale): string[] {
	// Convert to ABC notation, tracking explicit accidentals per pitch class
	// so we can re-apply key-signature accidentals when a previous natural/accidental
	// has altered the expected pitch.
	const explicitAccidentals = new Map<string, string>(); // pitch letter -> last explicit accidental
	return notes.map((n) => {
		const abc = AbcNotation.scientificToAbcNotation(n);
		const noteInfo = Note.get(n);
		const pitchLetter = noteInfo.letter;
		const noteAcc = noteInfo.acc || '';

		// Check if this note is diatonic in the key scale
		const isDiatonic = keyScale
			? keyScale.notes.some((scaleNote) => Note.get(scaleNote).pc === noteInfo.pc)
			: false;

		if (isDiatonic) {
			const prevAcc = explicitAccidentals.get(pitchLetter);
			// Find the key-signature accidental for this pitch letter
			const keyScaleNote = keyScale!.notes.find((sn) => Note.get(sn).letter === pitchLetter);
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
}

export function abcNotation(fragment: LanguageFragment, transposition: number): string {
	const pcSet = fragment.vocabulary;
	const tonic = pitchClassFromTransposition(transposition);
	const startingNote = tonic + getStartingOctave(tonic);
	const keyScale = Scale.get(startingNote + ' major');

	let notes: string[] = [];

	switch (fragment.category) {
		case 'scales':
			notes = constructScaleExercise(pcSet, startingNote);
			break;

		case 'arpeggios':
			notes = constructArpeggioExercise(pcSet, startingNote);
	}

	// Convert to abc
	const abcNotes = notesToAbc(notes, keyScale);

	// Group notes based on the length of the scale
	const grouping = eigthNoteGroupings[pcSet.intervals.length];
	const abcString = abcNotes
		.map((_, i) => (i % grouping === 0 ? abcNotes.slice(i, i + grouping) : null))
		.filter((n) => n !== null)
		.map((n) => n!.join(''))
		.join(' ');

	return 'K: ' + tonic + '\n' + abcString;
}
