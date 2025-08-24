import { getOauthProviders } from "../../../../config/oauthProvider";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";

export const getOauthProvidersService = () => {
  try {
    const listProviders = getOauthProviders();

    return listProviders.map(({ name, icon, req_endpoint }) => ({
      name,
      icon,
      req_endpoint,
    }));
  } catch (error) {
    ErrorForwarder(error);
  }
};
