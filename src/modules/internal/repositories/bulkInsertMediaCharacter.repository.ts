import {AppError} from "../../../helpers/error/instances/app";
import {MediaChar} from "../types/mediaCharacters";
import {prisma} from "../../../utils/databases/prisma/connection";
import {character_role} from "@prisma/client";

export const bulkInsertMediaCharacterRepository = async (
    mediaId: string,
    characters: MediaChar[]
) => {
    try {
        const chars = characters.map(c => ({
            mal_id: c.character.mal_id,
            name: c.character.name,
            image: c.character.images.webp.image_url,
            small_image: c.character.images.webp.small_image_url,
            fanpage_url: c.character.url
        }));

        const staffs = characters.flatMap(c =>
            c.voice_actors.map(v => ({
                mal_id: v.person.mal_id,
                name: v.person.name,
                image: v.person.images.jpg.image_url
            }))
        );

        await prisma.$transaction(async (tx) => {

            // Insert Character
            await tx.character.createMany({
                data: chars,
                skipDuplicates: true
            });

            // Insert Staff
            await tx.staff.createMany({
                data: staffs,
                skipDuplicates: true
            });

            // Get inserted characters
            const insertedChar = await tx.character.findMany({
                where: {
                    mal_id: {
                        in: chars.map(c => c.mal_id)
                    }
                },
                select: {
                    id: true,
                    mal_id: true
                }
            });

            // Get inserted staffs
            const insertedStaff = await tx.staff.findMany({
                where: {
                    mal_id: {
                        in: staffs.map(s => s.mal_id)
                    }
                },
                select: {
                    id: true,
                    mal_id: true
                }
            });

            // Build lookup map
            const characterMap = new Map(
                insertedChar.map(c => [c.mal_id!, c.id])
            );
            const staffMap = new Map(
                insertedStaff.map(s => [s.mal_id!, s.id])
            );

            // Connect media with characters
            const mediaCharacters = characters.map(c => {
                const characterId = characterMap.get(c.character.mal_id);
                if (!characterId)
                    throw new AppError(500, `Character ${c.character.mal_id} not found`);

                return {
                    media_id: mediaId,
                    character_id: characterId,
                    role: c.role.toLowerCase() as character_role
                };
            });
            await tx.mediaCharacter.createMany({
                data: mediaCharacters,
                skipDuplicates: true
            });

            // Insert all voice actor of characters
            const voiceActors = characters.flatMap(c => {
                const characterId = characterMap.get(c.character.mal_id);
                if (!characterId)
                    throw new AppError(500, `Character ${c.character.mal_id} not found`);

                return c.voice_actors.map(v => {
                    const staffId = staffMap.get(v.person.mal_id);
                    if (!staffId) throw new AppError(500, `Staff ${v.person.mal_id} not found`);

                    return {
                        media_id: mediaId,
                        character_id: characterId,
                        staff_id: staffId,
                        language: v.language
                    };
                });
            });
            await tx.voiceActor.createMany({
                data: voiceActors,
                skipDuplicates: true
            });
        });

    } catch (error) {
        throw new AppError(
            500,
            "Failed to bulk insert media characters",
            error
        );
    }
};