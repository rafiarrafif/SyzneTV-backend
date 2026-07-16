import { media_season } from "@prisma/client";

export interface AnimeFullDetail {
  data: Main;
}

export interface Main {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string | null;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: media_season;
  year: number | null;
  broadcast: Broadcast;
  producers: MetadataEntry[];
  licensors: MetadataEntry[];
  studios: MetadataEntry[];
  genres: MetadataEntry[];
  explicit_genres: MetadataEntry[];
  themes: MetadataEntry[];
  demographics: MetadataEntry[];
  relations: Relation[];
  theme: ThemeSongs;
  external: ExternalLink[];
  streaming: ExternalLink[];
  moreinfo: string | null;
}

export interface Images {
  jpg: ImageSet;
  webp: ImageSet;
}

export interface ImageSet {
  image_url: string;
  small_image_url: string | null;
  large_image_url: string | null;
}

export interface Trailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images: TrailerImages;
  title?: string | null;
  views?: number | null;
  likes?: number | null;
  dislikes?: number | null;
  comment_count?: number | null;
  published_at?: string | null;
  duration?: string | null;
  privacy_status?: string | null;
  region_restriction?: Record<string, unknown> | null;
  embeddable?: boolean | null;
}

export interface TrailerImages {
  image_url: string | null;
  small_image_url: string | null;
  medium_image_url: string | null;
  large_image_url: string | null;
  maximum_image_url: string | null;
}

export interface Title {
  type: string;
  title: string;
}

export interface Aired {
  from: string | null;
  to: string | null;
  prop: AiredProp;
  string: string | null;
}

export interface AiredProp {
  from: DateParts;
  to: DateParts;
}

export interface DateParts {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface Broadcast {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
}

export interface MetadataEntry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Relation {
  relation: string;
  entry: RelationEntry[];
}

export interface RelationEntry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
  media_type: string | null;
  images: Images;
}

export interface ThemeSongs {
  openings: string[];
  endings: string[];
}

export interface ExternalLink {
  name: string;
  url: string;
}
