export interface PeopleInfoResponse {
  data: Data;
}

interface Data {
  mal_id: number;
  url: string;
  website_url: null;
  images: Images;
  name: string;
  given_name: null;
  family_name: null;
  alternate_names: string[];
  birthday: Date;
  favorites: number;
  about: string;
}

interface Images {
  jpg: Jpg;
}

interface Jpg {
  image_url: string;
}
