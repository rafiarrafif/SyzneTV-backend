import {character_role} from "@prisma/client";

interface StaffVA {
    mal_id: number;
    url: string;
    name: string;
    images: {
        jpg: {
            image_url: string;
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

export interface MediaChar {
    character: Character;
    role: character_role;
    favorites: number;
    voice_actors: voiceActor[];
}

export type MediaCharacters = {
    data: MediaChar[];
};