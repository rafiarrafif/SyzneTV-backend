interface StaffVA {
    mal_id: number;
    url: string;
    images: {
        jpg: {
            image_url: string;
        },
        webp: {
            image_url: string;
            small_image_url: string;
        }
    }
}

interface voiceActor {
    person: StaffVA;
    language: string;
}

interface Character {
    mal_id: number;
    name: string;
    url: string;
    images: {
        jpg: {
            image_url: string;
        },
        webp: {
            image_url: string;
            small_image_url: string;
        }
    }
}

enum Role {
    Main = "Main",
    Supporting = "Supporting",
    Background = "Background",
}

export interface MediaChar {
    character: Character;
    role: Role;
    favorites: number;
    voice_actors: voiceActor[];
}

export type MediaCharacters = {
    data: MediaChar[];
};