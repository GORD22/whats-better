import t from 'api-helpers/toGqlParams';
import { fragments, renderFragments } from './_fragments';

/**
 * Сфера с полной детализацией
 */
const sphereFragments = `
    id
    name
    description
    label
	authorID
    mainMedia ${fragments.mediaData}
    countSpheres
    countCriteria
    countProperties
	countBattles
    countEntities
    countScores
	countArticles
    countSubscribers
	countAssociatedProperties
    countPresets
    countPosts
    subscribed
    popularCriteria {
        name
        id
        label
    }`;


/**
 * Поиск сфер по имени
 * 
 * @param {Object} params
 * @returns {String}
 */
export function search(obj) {
	let params = {
		...obj,
		type : 'spheres'
	}

    return `
        {search ${ t(params) } {
            count
            spheres {
                id
                name
                label
                countEntities
                countCriteria
                countSpheres
                countScores
                mainMedia ${fragments.mediaData}
            }
        }
    }`;
}


/**
 * Получение всех сфер
 * 
 * @param {Object} params
 * @param {Object} options
 * @returns {String}
 */
export function findAll(params, segments) {
    params.limit = params.limit || 20;
    params.hide = false;

    return `
        {spheres ${ t(params) } {
            name
            id
            label
			mainMedia ${fragments.mediaData}
            countScores
            countCriteria
            countSpheres
            countEntities
            countSubscribers
            subscribed
            ${ renderFragments(segments) }
        }
    }`;
}


/**
 * Получение корневых сфер
 * 
 * @param {Object} params
 * @param {Object} options
 * @returns {String}
 */
export function findRoot(params) {
    params.limit = params.limit || 20;

    return `
        {rootSpheres ${ t(params) } {
            name
            id
            label
			mainMedia ${fragments.mediaData}
            countSpheres
            countEntities
        }
    }`;
}


/**
 * Получение сферы по идентификатору
 * 
 * @param {Object} params
 * @param {Object} frg
 * @returns {String}
 */
export function findById(params, segments) {
    return `
        {sphere(id: "${params.id}"){
            ${ sphereFragments }
            ${ renderFragments(segments) }
        }
    }`;
}


/**
 * Создание сферы
 * 
 * @param {Object} params
 * @returns {String}
 */
export function create(params) {
    return `
        mutation { createSphere ${ t(params) } {
            ${ sphereFragments }
        }
    }`;
}


/**
 * Обновление сферы
 * 
 * @param {Object} params
 * @returns {String}
 */
export function update(params) {
    return `
        mutation { updateSphere ${ t(params) } {
            ${ sphereFragments }
        }
    }`;
}


/**
 * Получить связанные сферы
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findLinkedSpheres(params) {
    return `{
        linkedSpheres ${ t(params) } {
            id
            childSphere {
                id
                name
                label
				mainMedia ${fragments.mediaData}
                countCriteria
                countEntities
                countScores
            }
        }
    }`;
}


/**
 * Получить сферы, в которых есть оценки для заданного пользователя
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findRatedSpheres(params) {
    return `{
        ratedSpheres ${ t(params) } {
            id
            name
            label
			mainMedia ${fragments.mediaData}
            countScores
        }
    }`;
}


/**
 * Получить сферы, на которые подписан пользователь
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findMySpheres(params) {
    return `
        {mySpheres ${ t(params) } {
            id
            name
            description
            label
			mainMedia ${fragments.mediaData}
            countCriteria
            countSpheres
            countEntities
            countScores
            subscribed
        }
    }`;
}


/**
 * Получить типы сферы
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function getTypes(params) {
    return `
        {sphereTypes ${ t(params) } {
            id
            name
            label
			order
			group {
				name
				label
				order
			}
        }
    }`;
}


/**
 * Добавить тип сферы
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function addType(params) {
    return `
        mutation {
            addTypeToSphere ${ t(params) } {
                result
            }
    }`;
}


/**
 * Удалить тип сферы
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function removeType(params) {
    return `
        mutation {
            removeTypeFromSphere ${ t(params) } {
                result
            }
    }`;
}


/**
 * Получить настройки сферы
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function getSettings(params) {
    return `{
		sphereSettings ${ t(params) } {
			result
		}
    }`;
}

/**
 * Установить настройки сферы
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function setSettings(params) {
    return `
        mutation {
            setSphereSettings ${ t(params) } {
                result
            }
    }`;
}