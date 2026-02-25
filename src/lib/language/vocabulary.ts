import { Note, transposeNote, type NoteValue, type ScaleAlteration } from './note';

export class Vocabulary {
	private base: BaseVocabularyClass;
	private alterations: ScaleAlteration[];

	constructor(alterations: ScaleAlteration[] = [], base: BaseVocabularyClass = 'major') {
		this.base = base;
		this.alterations = alterations;
	}

	private baseNotes(key: NoteValue): Note[] {
		return BASE_VOCABULARY[this.base][key].map((n) => n.clone());
	}

	private notes(key: NoteValue): Note[] {
		return this.baseNotes(key).map((n, i) => {
			this.alterations.forEach(([j, a]) => {
				if (j - 1 === i) n.alter(a);
			});
			return n;
		});
	}

	private scale(key: NoteValue): Note[] {
		const notes = this.notes(key);
		const octave = notes[0].clone();
		octave.octave++;
		const ninth = notes[1].clone();
		ninth.octave++;
		return [...notes, octave, ninth, octave, ...notes.reverse().slice(0, notes.length - 1)];
	}

	abcNotation(transposition: number): string {
		const key = transposeNote('C', transposition);
		const notes = this.scale(key).map((n) => n.toAbc());

		// Group every 4 notes
		const abcString = notes
			.map((_, i) => (i % 4 === 0 ? notes.slice(i, i + 4) : null))
			.filter((n) => n !== null)
			.map((n) => n!.join(''))
			.join(' ');

		return 'K: ' + transposeNote('C', transposition) + '\n' + abcString;
	}
}

export type BaseVocabularyClass = 'major';
export const BASE_VOCABULARY: Record<BaseVocabularyClass, Record<NoteValue, Note[]>> = {
	major: {
		C: ['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(Note.parse),
		Db: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'c'].map(Note.parse),
		D: ['D', 'E', 'F#', 'G', 'A', 'B', 'c#'].map(Note.parse),
		Eb: ['Eb', 'F', 'G', 'Ab', 'Bb', 'c', 'd'].map(Note.parse),
		E: ['E', 'F#', 'G#', 'A', 'B', 'c#', 'd#'].map(Note.parse),
		F: ['F', 'G', 'A', 'Bb', 'c', 'd', 'e'].map(Note.parse),
		Gb: ['Gb', 'Ab', 'Bb', 'c', 'db', 'eb', 'f'].map(Note.parse),
		G: ['G', 'A', 'B', 'c', 'd', 'e', 'f#'].map(Note.parse),
		Ab: ['Ab,', 'Bb,', 'C', 'Db', 'Eb', 'F', 'G'].map(Note.parse),
		A: ['A,', 'B,', 'C#', 'D', 'E', 'F#', 'G#'].map(Note.parse),
		Bb: ['Bb,', 'C', 'D', 'Eb', 'F', 'G', 'A'].map(Note.parse),
		B: ['B,', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'].map(Note.parse)
	}
};
