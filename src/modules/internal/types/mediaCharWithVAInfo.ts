export interface MediaCharWithVAInfo {
  data: Datum[];
}

interface Datum {
  character: Character;
  role: Role;
  favorites: number;
  voice_actors: VoiceActor[];
}

interface Character {
  mal_id: number;
  url: string;
  images: CharacterImages;
  name: string;
}

interface CharacterImages {
  jpg: Jpg;
  webp: Webp;
}

interface Jpg {
  image_url: string;
}

interface Webp {
  image_url: string;
  small_image_url: string;
}

enum Role {
  Main = "Main",
  Supporting = "Supporting",
}

export interface VoiceActor {
  person: Person;
  language: Language;
}

enum Language {
  English = "English",
  Japanese = "Japanese",
  PortugueseBR = "Portuguese (BR)",
  Spanish = "Spanish",
}

export interface Person {
  mal_id: number;
  url: string;
  images: PersonImages;
  name: string;
}

interface PersonImages {
  jpg: Jpg;
}
