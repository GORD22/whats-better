import t from 'api-helpers/toGqlParams';
import { renderFragments, fragments } from './_fragments';

const userFields =  `
    id
    name
	login
	firstName
	lastName
    mainMedia ${fragments.mediaData}
    relation
	about
	active
    karma
	entityID
    createdAt
`;


/**
 * Найти пользователя по идентификатору
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findById(params, segments ) {

    return `
        {user ${ t(params)}  {
                ${ userFields }
                ${ renderFragments(segments) }
            }
        }`;
}


/**
 * Поиск пользователей
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findAll(params = {}) {
    params.limit = params.limit || 20;
    
    return `
        {users ${ t(params) } {
            id
            name
            karma
			login
            mainMedia ${fragments.mediaData}
        }
    }`;
}


/**
 * Обновить пользователя
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function update(params = {}) {    
    return `
        mutation {updateUser ${ t(params) } {
            id
            name
        }
    }`;
}


/**
 * Обновить пользователя
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function create(params = {}) {    
    return `
        mutation {createUser ${ t(params) } {
            id
            name
        }
    }`;
}


/**
 * Поиск пользователей по имени
 * 
 * @param {Object} params
 * @returns {String}
 */
export function search(obj) {
	let params = {
		...obj,
		type : 'users'
	}

    return `
        {search ${ t(params) } {
            users{
                id
                name
                mainMedia ${fragments.mediaData}
                karma
            }
        }
    }`;
}


/**
 * Найти текущего пользователя по токену
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findMe(segments) {
    return `
        { me {
            ${ userFields }
            ${ renderFragments(segments) }
            countScores
            phone
            email
			isMale
			code
        }
    }`;
}


/**
 * Удалить свой аккаунт
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function removeMe() {
    return `
		mutation {removeUser {
			result
		}
	}`;
}


/**
 * Восстановить свой аккаунт
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function restoreMe() {
    return `
		mutation {restoreUser {
			result
		}
	}`;
}


/**
 * Добавить подписку на сферу
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function addSubscriptionToSphere(params) {
    return `
        mutation {addSubscriptionForSpheres ${ t(params) } {
            id
        }
    }`;
}


/**
 * Удалить подписку на сферу
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function removeSubscriptionToSphere(params) {
    return `
        mutation {removeSubscriptionForSpheres ${ t(params) } {
            id
        }
    }`;
}


/**
 * Получить друзей текущуго пользователя
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findFriends(params) {    
    params.limit = params.limit || 20;

    return `
        {friends ${ t(params) } {
                ${ userFields }
            }
        }`;
}


/**
 * Получить подписчиков текущуго пользователя
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findFollowers(params) {
    return `
        {followers ${ t(params) }  {
                ${ userFields }
            }
        }`;
}


/**
 * Получить подписки текущуго пользователя
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function findFollowing(params) {
    return `
        {followings ${ t(params) }  {
                ${ userFields }
            }
        }`;
}


/**
 * Получить рефералов текущуго пользователя
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function findReferrals(params) {
    return `
        {referrals ${ t(params) }  {
                ${ userFields }
            }
        }`;
}

/**
 * Подписаться
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function follow(params) {
    return `
        mutation {follow ${ t(params) } {
            result
        }
    }`;
}


/**
 * Отписаться
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function unfollow(params) {
    return `
        mutation {unfollow ${ t(params) } {
			result
        }
    }`;
}


/**
 * Добавить в друзья
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function addFriend(params) {
    return `
        mutation {addFriend ${ t(params) } {
			result
        }
    }`;
}


/**
 * Удалить из друзей
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function removeFriend(params) {
    return `
        mutation {removeFriend ${ t(params) } {
            result
        }
    }`;
}


/**
 * Подтвердить дружбу 
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function confirmFriend(params) {
    return `
       	mutation {confirmFriend ${ t(params) } {
			result
       }
   }`;
}


/**
 * Получить подписчиков сферы
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findSphereSubscribers(params) {
    return `
        {sphereSubscribers ${ t(params) } {
            id
            name
            mainMedia ${fragments.mediaData}
            karma
       }
   }`;
}


/**
 * Получить друзей друзей текущего пользователя 
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function getFriendsOfFriends(params) {
    return `
        {friendsOfFriends ${ t(params) } {
            id
            name
            mainMedia ${fragments.mediaData}
            karma
       }
   }`;
}


/**
 * Получить список пользователей, которые поставили оценку в сфере по объекту и критерию
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function whoRated(params) {
    return `
        {whoRated ${ t(params) } {
            id
            name
            mainMedia ${fragments.mediaData}
            countScores
       }
   }`;
}


/**
 * Получить экспертов сферы
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findExperts(params) {
    return `
        {experts ${ t(params) } {
            id
            name
            mainMedia ${fragments.mediaData}
            countScores
       }
   }`;
}


/**
 * Получить схожесть двух пользователей
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function getSimilarity(params) {
    let fragment = `
        difference
        entity {
            id
            label
            mainMedia ${fragments.mediaData}
        }
        criterion {
            id
            label
        }
        sphere {
            id
            label
        }
        scores {
            userID
            value
        }
    `;

    return `{
        similarity ${ t(params) } { 
            value
            countGeneralScores
            countAgree 
            countDisagree 
            users {
                id
                name
                mainMedia ${fragments.mediaData}
                countScores
            }
            agree {
                ${ fragment }
            }     
            disagree {
                ${ fragment }
            }
        }
   }`;
}


/**
 * Заблокировать пользователя по идентификатору
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function lock(params) {
    return `
        mutation { lockUser ${ t(params) } {
			result
       }
   }`;
}


/**
 * Разблокировать пользователя по идентификатору
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function unlock(params) {
    return `
		mutation {unlockUser ${ t(params) } {
			result
       }
   }`;
}


/**
 * Проверить, заблокирован ли текущий пользователь у другово пользователя  
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function checkLock(params) {
    return `
        {checkUserLock ${ t(params) } {
			result
       }
   }`;
}