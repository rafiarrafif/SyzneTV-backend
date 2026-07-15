import Elysia from "elysia";
import {bulkInsertEpisodeController} from "./controllers/bulkInsertEpisode.controller";
import {bulkInsertMediaController} from "./controllers/bulkInsertMedia.controller";
import {createVideoServiceInternalController} from "./controllers/createVideoService.controller";
import {bulkInsertVideoController} from "./controllers/bulkInsertVideo.controller";
import {purgeUnusedSessionController} from "./controllers/purgeUnusedSession.controller";
import {bulkInsertMediaSchema} from "./schemas/bulkInsertMedia.schema";
import {bulkInsertEpisodeSchema} from "./schemas/bulkInsertEpisode.schema";
import {bulkInsertVideoSchema} from "./schemas/bulkInsertVideo.schema";
import {createVideoServiceInternalSchema} from "./schemas/createVideoServiceInternal.schema";
import {purgeUnusedSessionSchema} from "./schemas/purgeUnusedSession.schema";

export const internalModule = new Elysia({
    prefix: "/internal",
    tags: ["Internal"],
})
    .post("/media/bulk-insert", bulkInsertMediaController, bulkInsertMediaSchema)
    .post("/episode/bulk-insert", bulkInsertEpisodeController, bulkInsertEpisodeSchema)
    .post("/video/bulk-insert", bulkInsertVideoController, bulkInsertVideoSchema)
    .post("/video-service", createVideoServiceInternalController, createVideoServiceInternalSchema)
    .post("/user-session/purge-unused", purgeUnusedSessionController, purgeUnusedSessionSchema)
