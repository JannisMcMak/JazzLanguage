export const NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const;
export const NATURAL_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;

export type NoteValue = (typeof NOTES)[number];
export type NoteModifier = 'natural' | 'sharp' | 'flat' | 'doubleSharp' | 'doubleFlat';
export type Alteration = 'up' | 'down';
export type ScaleAlteration = [number, Alteration];

export const KEY_SIGNATURES: Record<NoteValue, NoteValue[]> = {
	C: [],
	Db: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
	D: ["Gb"]
};

export function transposeNote(note: NoteValue, transposition: number): NoteValue {
	return NOTES[(NOTES.indexOf(note) + transposition) % NOTES.length];
}

export class Note {
	value: NoteValue;
	modifier: NoteModifier;
	/** Octave modifier relative to octave 4 (0 = normal) */
	octave: number;

	constructor(value: NoteValue, modifier: NoteModifier = 'natural', octave: number = 0) {
		this.value = value;
		this.modifier = modifier;
		this.octave = octave;
	}

	static parse(note: string): Note {
		const noteValue = Array.from(note)[0];
		const modifier = note.includes('#') ? 'sharp' : note.includes('b') ? 'flat' : 'natural';
		const octave = noteValue.toLowerCase() === noteValue ? 1 : note.includes(',') ? -1 : 0;
		return new Note(noteValue as NoteValue, modifier, octave);
	}

	clone() {
		return new Note(this.value, this.modifier, this.octave);
	}

	alter(alteration: Alteration) {
		if (alteration === 'up') this.raise();
		else this.lower();
	}

	/** Increase the note by a half-step, preferably using modifiers */
	raise() {
		const nextModifier: Record<NoteModifier, NoteModifier> = {
			doubleFlat: 'flat',
			flat: 'natural',
			natural: 'sharp',
			sharp: 'doubleSharp',
			doubleSharp: 'doubleSharp'
		};
		if (this.modifier === 'sharp' || this.modifier === 'doubleSharp') {
			console.warn('WARNING: Note is already sharp or double sharp');
		}
		this.modifier = nextModifier[this.modifier];
	}

	/** Decrease the note by a half-step, preferably using modifiers */
	lower() {
		const nextModifier: Record<NoteModifier, NoteModifier> = {
			doubleSharp: 'sharp',
			sharp: 'natural',
			natural: 'flat',
			flat: 'doubleFlat',
			doubleFlat: 'doubleFlat'
		};
		if (this.modifier === 'flat' || this.modifier === 'doubleFlat') {
			console.warn('WARNING: Note is already flat or double flat');
		}
		this.modifier = nextModifier[this.modifier];
	}

	/** Check if this note is a diatonic note in the given key (major) */
	isDiatonicIn(key: NoteValue): boolean {}

	get abcValue() {
		switch (this.octave) {
			case 0:
				return this.value.toUpperCase();
			case 1:
				return this.value.toLowerCase();
			case 2:
				return this.value.toLowerCase() + "'";
			case -1:
				return this.value.toUpperCase() + ',';
		}
	}

	get abcMod() {
		switch (this.modifier) {
			case 'sharp':
				return '^';
			case 'flat':
				return '_';
			case 'natural':
				return '';
			default:
				console.warn("WARNING: Modifier '" + this.modifier + "' not supported");
				return '';
		}
	}

	toAbc(): string {
		return this.abcMod + this.abcValue;
	}
}
