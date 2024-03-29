import { HttpsError, onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
const cors = require('cors')({ origin: true });
const StreamChat = require('stream-chat').StreamChat;

const serverStreamClient = StreamChat.getInstance(
  'gxeu78h47d2q',
  'uvu9ddwx95h3t9rm6snee4ngnrj3c2c4e9r5s7rbawge8kpfq22737hbwhs8t83m'
);

admin.initializeApp();

export const createStreamUser = onRequest((request: any, response: any) => {
  cors(request, response, async () => {
    const { user } = request.body;
    if (!user) {
      throw new HttpsError('failed-precondition', 'Bad request');
    } else {
      try {
        await serverStreamClient.upsertUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
        });
        response.status(200).send({ message: 'User created' });
      } catch (error) {
        throw new HttpsError('aborted', 'Could not create Stream user');
      }
    }
  });
});
export const createStreamToken = onRequest((request: any, response: any) => {
  cors(request, response, async () => {
    const { user } = request.body;
    if (!user) {
      throw new HttpsError(
        'failed-precondition',
        'The function must be called ' + 'while authenticated.'
      );
    } else {
      try {
        const token = await serverStreamClient.createToken(user.uid);
        response.status(200).send({ token });
      } catch (error) {
        throw new HttpsError('aborted', 'Could not get Stream user');
      }
    }
  });
});
export const revokeStreamUserToken = onRequest(
  (request: any, response: any) => {
    cors(request, response, async () => {
      const { user } = request.body;
      if (!user) {
        throw new HttpsError(
          'failed-precondition',
          'The function must be called ' + 'while authenticated.'
        );
      } else {
        try {
          await serverStreamClient.revokeUserToken(user.uid);
          response.status(200).send({ message: 'User sighed out' });
        } catch (error) {
          throw new HttpsError('aborted', 'Could not get Stream user');
        }
      }
    });
  }
);
