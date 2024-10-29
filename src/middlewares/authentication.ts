import jwt from 'jsonwebtoken';
import express from 'express';

/** Define the session property on the request object   */
declare global {
  namespace Express {
    interface Request {
      session: {
        accountId: string;
        userId: string;
        backToUrl: string | undefined;
        shortLivedToken: string | undefined;
      };
    }
  }
}

export async function authenticationMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const authorization = req.headers.authorization ?? req.query?.token;

    if (typeof authorization !== 'string') {
      return res
        .status(401)
        .json({ error: 'not authenticated, no credentials in request' });
    }

    let secret = process.env.MONDAY_SIGNING_SECRET;

    // check if request is coming from Order Form views
    if (req.headers['order-view-request']) {
      secret = process.env.MONDAY_CLIENT_SECRET;

      if (typeof secret !== 'string') {
        return res.status(500).json({
          error: 'Missing CLIENT_SIGNING_SECRET (should be in .env file)',
        });
      }

      jwt.verify(authorization, secret) as any;
      return next();
    }

    if (typeof secret !== 'string') {
      return res.status(500).json({
        error: 'Missing MONDAY_SIGNING_SECRET (should be in .env file)',
      });
    }

    const { accountId, userId, backToUrl, shortLivedToken } = jwt.verify(
      authorization,
      secret
    ) as any;

    req.session = { accountId, userId, backToUrl, shortLivedToken };

    return next();
  } catch (err) {
    res
      .status(401)
      .json({ error: 'authentication error, could not verify credentials' });
  }
}
