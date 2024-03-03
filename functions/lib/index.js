"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStreamUser = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require('cors')({ origin: true });
const StreamChat = require('stream-chat').StreamChat;
const serverStreamClient = StreamChat.getInstance('gxeu78h47d2q', 'uvu9ddwx95h3t9rm6snee4ngnrj3c2c4e9r5s7rbawge8kpfq22737hbwhs8t83m');
admin.initializeApp();
exports.createStreamUser = (0, https_1.onRequest)((request, response) => {
    cors(request, response, async () => {
        const { user } = request.body;
        if (!user) {
            throw new https_1.HttpsError('failed-precondition', 'Bad request');
        }
        else {
            try {
                await serverStreamClient.upsertUser({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                });
                response.status(200).send({ message: 'User created' });
            }
            catch (error) {
                throw new https_1.HttpsError('aborted', 'Could not create Stream user');
            }
        }
    });
});
//# sourceMappingURL=index.js.map