export interface ISuggestionItem {
	title: string;
}

export type Suggestions = ISuggestionItem[];

export type AutocompleteFunction = (str: string, offset: number, lineOffset: number) => Suggestions;
