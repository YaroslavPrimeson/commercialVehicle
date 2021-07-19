import {fire} from '../Firebase/Firebase.js';


/*** ================================================================================
 *          JSON's
 * ================================================================================*/
export const serviceTariffsID = 'QqabZKKQPqt9jBqpwzXw';
export const reviews = [];
export const rating = [];
/*** ================================================================================
 *          Parse Dates
 * ================================================================================*/
export function getDateFromMilliseconds(num) {
    const date = new Date(num);
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getUTCDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}
export function getDate() {
    const date = new Date();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getUTCDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}
export function getDateInput(input) {
    if (input === undefined) {
        return "-"
    }
    try {
        const date = new Date(input);
        return date.getUTCDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    } catch (e) {
        return "0"
    }

}
/*** ================================================================================
 *          Firebase
 * ================================================================================*/
export async function  getCollection (collection)    {
     return new  Promise(await function (resolve, reject) {
          fire.firestore().collection(collection).get().then(res => {
               const data = [];
            res.forEach(doc => {
                data.push({
                    idPost: doc.id,
                    ...doc.data()
                })
            });
            resolve(data)
        }).catch(err => {
            reject(err);
        });
    });
}
export function getDocInCollection(collection, id) {
    return new Promise(function (resolve, reject) {
        try {
            fire.firestore().collection(collection).doc(id)
                .get()
                .then(querySnapshot => {
                    resolve(querySnapshot.data());
                });
        } catch (e) {
            reject(e);
        }
    })
}
export function getCollectionWhereKeyValue(collection, key, value) {
    return new Promise(function (resolve, reject) {
        fire.firestore().collection(collection).where(key, "==", value).get().then(res => {
            const data = [];
            res.forEach(doc => {
                data.push({
                    idPost: doc.id,
                    ...doc.data()
                })
            });
            resolve(data)
        }).catch(err => {
            reject(err);
        });
    });
}
export function setDocumentToCollection(collection, document) {
    return new Promise(function (resolve, reject) {
        try {
            fire.firestore().collection(collection).add(document)
                .then(r => {
                    resolve({result: r});
                }).catch(e => {
                reject(e);
            })
        } catch (e) {
            reject(e);
        }
    })
}
export function updateDocumentInCollection(collection, document, idDocumnent) {
    return new Promise(function (resolve, reject) {
        try {
            fire.firestore().collection(collection).doc(idDocumnent).update(document).then(r => {
                resolve({result: r})
            }).catch(e => {
                reject(e);
            })
        } catch (e) {
            reject(e);
        }
    })
}
export function deleteDocumentFromCollectionWithID(collection, idPost) {
    return new Promise(function (resolve, reject) {
        try {
            fire.firestore().collection(collection).doc(idPost).delete()
                .then(result => {
                    resolve(result)
                }).catch(function (error) {
                reject(error)
            });
        } catch (e) {
            reject(e)
        }
    })
}
/*** ================================================================================
 *          Firebase
 * ================================================================================*/
export function createNewUser(user, role) {
    return new Promise(function (resolve, reject) {
        getCollectionWhereKeyValue('users', 'uid_firebase', user.uid).then(r => {
            if (r.length === 0) {
                let user_to_firebase = {
                    role: role,
                    uid_firebase: user.uid,
                    displayName_firebase:  user.displayName === null ? '' : user.displayName ,
                    email_firebase: user.email  === null ? '' : user.email,
                    emailVerified_firebase: user.emailVerified,
                    phoneNumber_firebase: user.phoneNumber === null ? '' : user.phoneNumber,
                    photoURL_firebase: user.photoURL  === null ? '' : user.photoURL,
                    language: '',
                };
                if (role === "client"){
                    user_to_firebase = {
                        ...user_to_firebase,
                        reviews: [],
                        rating: [],
                    }
                }else if(role === "driver"){
                    user_to_firebase = {
                        ...user_to_firebase,
                        reviews: [],
                        rating: [5],
                        truck_plate_number: '',
                        ADR_class: '',
                        vehicle_model: '',
                        euro_class: '',
                        HPK_horse_power: '',
                        engine: '',
                        max_weight: '',
                        country_from: '',
                        trips:0,
                    }
                }
                setDocumentToCollection('users', user_to_firebase).then(r => {
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            } else {
                // localStorage.setItem('role__trucks', r[0].role)]
                resolve('Registered')
            }
        }).catch(e => {
            reject(e)
        })
    })
}


//
// export function createNewUser(user, role) {
//     return new Promise(function (resolve, reject) {
//         getCollectionWhereKeyValue('users', 'uid_firebase', user.uid).then(r => {
//             if (r.length === 0 && role === "driver") {
//                 let user_to_firebase = {
//                     role: role,
//                     uid_firebase: user.uid,
//                     displayName_firebase: user.displayName,
//                     email_firebase: user.email,
//                     emailVerified_firebase: user.emailVerified,
//                     phoneNumber_firebase: user.phoneNumber,
//                     photoURL_firebase: user.photoURL,
//                     truck_plate_number:user.truck_plate_number,
//                     ADR_class:user.ADR_class,
//                     vehicle_model:user.vehicle_model,
//                     euro_class:user.euro_class,
//                     HPK_horse_power:user.HPK_horse_power,
//                     engine:user.engine,
//                     max_weight:user.max_weight,
//                     language:user.language,
//                     country_from:user.country_from,
//                     reviews:user.reviews,
//                 };
//                 setDocumentToCollection('users', user_to_firebase).then(r => {
//                     resolve(r)
//                 }).catch(e => {
//                     reject(e)
//                 })
//             } else if(r.length === 0 && role === "client"){
//                 let user_to_firebase = {
//                     role: role,
//                     uid_firebase: user.uid,
//                     displayName_firebase: user.displayName,
//                     email_firebase: user.email,
//                     emailVerified_firebase: user.emailVerified,
//                     phoneNumber_firebase: user.phoneNumber,
//                     photoURL_firebase: user.photoURL,
//                     reviews:user.reviews,
//                     language:user.language,
//                     country_from:user.country_from,
//                 };
//                 setDocumentToCollection('users', user_to_firebase).then(r => {
//                     resolve(r)
//                 }).catch(e => {
//                     reject(e)
//                 })
//             } else {
//                 localStorage.setItem('role__trucks', r[0].role)
//             }
//         }).catch(e => {
//             reject(e)
//         })
//     })
// }