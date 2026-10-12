# Data Model

## Core Entities

```ts
type Verse = {
  id: string;               // "GEN.1.1"
  book: string;
  chapter: number;
  verse: number;
  english: string;
  original: string;         // Hebrew or Greek
  transliteration?: string;
  morphology?: Word[];
};

type Word = {
  text: string;
  lemma: string;
  strongs: string;
  morphology: string;
  gloss: string;
};

type Connection = {
  id: string;
  from: string;             // verse id
  to: string;
  type: "quotation" | "allusion" | "shared_word" | "structural" | "thematic" | "fulfillment";
  strength: number;         // 0–1
  evidence: string;
  notes?: string;
};

type Theme = {
  id: string;
  name: string;
  verses: string[];
  color: string;
};

type Location = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  verses: string[];
};
```

## Prototype Focus

Start with a small, high-quality graph:
- Genesis 1:1–5
- John 1:1–5
- Explicit connections between them
- Word studies for בְּרֵאשִׁית, בָּרָא, דָּבָר / λόγος
