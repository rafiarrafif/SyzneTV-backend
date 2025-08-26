import { getOauthProviders } from "../../../../config/oauthProvider";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";

export const getOauthProvidersService = () => {
  try {
    const listProviders = getOauthProviders();

    return listProviders.map(({ name, icon, req_endpoint }) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      icon,
      req_endpoint,
    }));
  } catch (error) {
    ErrorForwarder(error);
  }
};
