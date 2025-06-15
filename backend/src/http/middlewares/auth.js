import { unauthorizedResponse } from '../../shared/utils/httpResponse.js';
import {
  verifyAccessToken,
  verifyRefreshToken,
} from '../../shared/utils/jwt.js';

function verifyAuthentication(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const refreshToken = req.cookies.deskye_refresh_token;

    if (!token || !refreshToken) {
      return unauthorizedResponse(res, 'Unauthorized', 401);
    }

    verifyRefreshToken(refreshToken);
    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch {
    return unauthorizedResponse(res, 'Unauthorized', 401);
  }
}

export { verifyAuthentication };
