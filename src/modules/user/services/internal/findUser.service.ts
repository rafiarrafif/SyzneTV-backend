import { findUserByEmailRepository } from "../../repositories/read/findUserByEmail.repository";
import { getUserDataService } from "../../user.types";
import { AppError } from "../../../../helpers/error/instances/app";
import { findUserByIdRepository } from "../../repositories/read/findUserById.repository";
import { findUserByUsernameRepository } from "../../repositories/read/findUserByUsername.repository";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";

export const findUserService = async (payload: getUserDataService) => {
  try {
    const repositoryMap = {
      id: findUserByIdRepository,
      email: findUserByEmailRepository,
      username: findUserByUsernameRepository,
    } as const;

    const repoFn = repositoryMap[payload.queryTarget];
    if (!repoFn) throw new AppError(502, "Repository handler not found");

    const userData = await repoFn(payload.identifier);

    const existsVerbosity = ["exists"].includes(payload.options.verbosity);
    const fullVerbosity = ["full"].includes(payload.options.verbosity);
    const basicVerbosity = ["basic", "full"].includes(
      payload.options.verbosity
    );

    if (!userData) throw new AppError(404, "User not found");
    if (existsVerbosity) return true;

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
