import { Prisma } from "@prisma/client";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { updateUserRepo } from "../repositories/updateUser.repository";
import { checkUserEmailAndUsernameAvailabillityService } from "./checkUserEmailAndUsernameAvailabillity.service";
import { logoutService } from "../../auth/services/logout.service";
import { loginFromSystemService } from "../../auth/services/loginFromSystem.service";
import { UserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { saveAvatar } from "../../../helpers/files/saveFile/modules/saveAvatar";

export const editUserService = async (
  cookie: string,
  userHeaderInfo: UserHeaderInformation,
  payload: Prisma.UserUpdateInput
) => {
  try {
    // Decode the JWT token and verify the user, if the user is not the same as the identifier, throw an error
    const jwtSession = jwtDecode(cookie);

    // Check if the username or email is being taken by another user, if so, throw an error
    const isUsernameOrEmailIsBeingTaken =
      await checkUserEmailAndUsernameAvailabillityService(
        payload,
        jwtSession.userId
      );
    if (isUsernameOrEmailIsBeingTaken)
      throw new AppError(
        409,
        "The username or email has already taken by another user."
      );

    // Store the avatar to the file system if provided in the payload
    let storeAvatar: string | undefined = undefined;
    if (payload.profilePicture)
      storeAvatar = await saveAvatar(payload.profilePicture as File);

    // Prepare the fields to update, only include fields that are provided in the payload
    const fieldsToUpdate: Partial<Prisma.UserUpdateInput> = {
      ...(payload.username && payload.username !== jwtSession.user.username
        ? { username: payload.username }
        : {}),

      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.birthDate !== undefined
        ? { birthDate: payload.birthDate }
        : {}),
      ...(payload.gender !== undefined ? { gender: payload.gender } : {}),
      ...(payload.phoneCC !== undefined ? { phoneCC: payload.phoneCC } : {}),
      ...(payload.phoneNumber !== undefined
        ? { phoneNumber: payload.phoneNumber }
        : {}),
      ...(payload.bioProfile !== undefined
        ? { bioProfile: payload.bioProfile }
        : {}),
      ...(storeAvatar !== undefined ? { profilePicture: storeAvatar } : {}),
      ...(payload.commentPicture !== undefined
        ? { commentPicture: payload.commentPicture }
        : {}),
      ...(payload.deletedAt !== undefined
        ? { deletedAt: payload.deletedAt }
        : {}),
    };

    // Update the user in the database, use username from the JWT session to find the user
    await updateUserRepo(jwtSession.user.username, fieldsToUpdate);

    // Clear the session and re-login the user to get a new JWT token
    await logoutService(cookie);
    const newUserSession = await loginFromSystemService(
      jwtSession.userId,
      userHeaderInfo
    );

    return newUserSession;
  } catch (error) {
    ErrorForwarder(error, 500, "Internal server error");
  }
};
