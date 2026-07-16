export interface AnimeCharacters {
  data: AnimeCharacter[];
}

export interface AnimeCharacter {
  character: Character;
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
}

interface Character {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
}

interface Images {
  jpg: Jpg;
  webp?: Webp | null;
}

interface Jpg {
  image_url: string;
  small_image_url?: string | null;
}

interface Webp {
  image_url: string;
  small_image_url?: string | null;
}

interface VoiceActor {
  person: Person;
  language: string;
}

interface Person {
  mal_id: number;
  url: string;
  images: PersonImages;
  name: string;
  favorites: number;
}

interface PersonImages {
  jpg: PersonJpg;
}

interface PersonJpg {
  image_url: string;
}
