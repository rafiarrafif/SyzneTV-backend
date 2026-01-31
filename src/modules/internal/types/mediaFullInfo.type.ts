import { MediaType } from "@prisma/client";
export interface MediaFullInfoResponse {
  data: Data;
}

interface Data {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: MediaType;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Genre[];
  licensors: unknown[];
  studios: Genre[];
  genres: Genre[];
  explicit_genres: unknown[];
  themes: Genre[];
  demographics: unknown[];
  relations: Relation[];
  theme: Theme;
  external: External[];
  streaming: External[];
}

interface Aired {
  from: Date;
  to: Date;
  prop: Prop;
  string: string;
}

interface Prop {
  from: From;
  to: From;
}

interface From {
  day: number;
  month: number;
  year: number;
}

interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

interface External {
  name: string;
  url: string;
}

interface Genre {
  mal_id: number;
  type: Type;
  name: string;
  url: string;
}

enum Type {
  Anime = "anime",
  Manga = "manga",
}

interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Relation {
  relation: string;
  entry: Genre[];
}

interface Theme {
  openings: string[];
  endings: string[];
}

interface Title {
  type: string;
  title: string;
}

interface Trailer {
  youtube_id: null;
  url: null;
  embed_url: string;
  images: Images;
}

interface Images {
  image_url: null;
  small_image_url: null;
  medium_image_url: null;
  large_image_url: null;
  maximum_image_url: null;
}
