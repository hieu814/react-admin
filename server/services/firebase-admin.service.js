const { applicationDefault } = require('firebase-admin/app');
const admin = require('firebase-admin');

// const serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
    credential: applicationDefault(),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
function vertifyAccessToken(idToken) {
    var promise = new Promise(function (resolve, reject) {
        admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
            console.log('ID Token correctly decoded', decodedIdToken);
            admin.auth().getUser(decodedIdToken.uid).then((userRecord) => {
                resolve({ user: userRecord })
            }).catch(error => {
                console.error('Error while getting Firebase User record:', error);
                resolve({ user: null })
            });
        }).catch(error => {
            console.error('Error while verifying Firebase ID token:', error);
            resolve({ user: null })
        });
    })
    return promise

}
module.exports = { admin, vertifyAccessToken }

// async updateGroupQuestion(questionId, body) {
//     if (body?.question)
//         return questionModel.updateOne({ "_id": questionId, "questions._id": body?.question._id }, { "$set": { "questions.$": body?.question } })
//     else if (body?.passage)
//         return questionModel.updateOne({ "_id": questionId, "passages._id": body?.passage._id }, { "$set": { "passages.$": body?.passage } })
// }