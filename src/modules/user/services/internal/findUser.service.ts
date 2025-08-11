import { findUserByEmailRepository } from "../../repositories/read/findUserByEmail.repository";
import { getUserDataService } from "../../user.types";
import { AppError } from "../../../../helpers/error/instances/app";
import { findUserByIdRepository } from "../../repositories/read/findUserById.repository";
import { findUserByUsernameRepository } from "../../repositories/read/findUserByUsername.repository";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { findUserByProviderIdRepository } from "../../repositories/read/findUserByProviderId.repository";

export const findUserService = async (payload: getUserDataService) => {
  try {
    // Define query target with the related repository
    const repositoryMap = {
      id: findUserByIdRepository,
      providerId: findUserByProviderIdRepository,
      email: findUserByEmailRepository,
      username: findUserByUsernameRepository,
    } as const;

    // Check if the repository is available for the target query, if not return an error
    const repoFn = repositoryMap[payload.queryTarget];
    if (!repoFn) throw new AppError(503, "Repository handler not found");

    // Retrieving user data using the associated repository, if user not found return 404 response
    const userData = await repoFn(payload.identifier, payload.options.include);
    if (!userData) throw new AppError(404, "User not found");

    // Define verbosity levels
    const existsVerbosity = ["exists"].includes(payload.options.verbosity);
    const fullVerbosity = ["full"].includes(payload.options.verbosity);
    const basicVerbosity = ["basic", "full"].includes(
      payload.options.verbosity
    );

    // If verbosity in 'exists' level and user is valid then just return 'true' value
    if (existsVerbosity) return true;

    // Construct response payload by adjusting the verbosity level
    const response = {
      ...(fullVerbosity && { id: userData?.id }),
      ...(basicVerbosity && { name: userData?.name }),
      ...(basicVerbosity && { username: userData?.username }),
      ...(fullVerbosity && { email: userData?.email }),
      ...(fullVerbosity && { password: userData?.password }),
      ...(fullVerbosity && { birthDate: userData?.birthDate }),
      ...(fullVerbosity && { gender: userData?.gender }),
      ...(fullVerbosity && { phoneCC: userData?.phoneCC }),
      ...(fullVerbosity && { phoneNumber: userData?.phoneNumber }),
      ...(basicVerbosity && { bioProfile: userData?.bioProfile }),
      ...(basicVerbosity && { avatar: userData?.avatar }),
      ...(basicVerbosity && { commentBackground: userData?.commentBackground }),
      ...(fullVerbosity && { verifiedAt: userData?.verifiedAt }),
      ...(fullVerbosity && { disabledAt: userData?.disabledAt }),
      ...(fullVerbosity && { deletedAt: userData?.deletedAt }),
      ...(fullVerbosity && { createdAt: userData?.createdAt }),
      ...(fullVerbosity && { updatedAt: userData?.updatedAt }),
    };
    return response;
  } catch (error) {
    ErrorForwarder(error);
  }
};
