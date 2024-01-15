import t from 'api-helpers/toGqlParams';
import { renderFragments, fragments } from './_fragments';
import escape from 'helpers/escape';

const entityFields =  `
    id
    name
    label
	lat
	lng
    description
    mainMedia ${fragments.mediaData}
    avgScore
    countScores
	countMedia
	countVideo
	countClips
	countGalleries
	countPosts
	countArticles
	countMedals
	authorID
`;


/**
 * Поиск объектов по имени
 * 
 * @param {Object} params
 * @returns {String}
 */
export function search(obj) {	
	let params = {
		...obj,
		type : 'entities'
	}
    
    return `
        {search ${ t(params) } {
            count
            entities {
                id
                label
                mainMedia ${fragments.mediaData}
				spheres {
					id
					label
				}
            }
        }
    }`;
}


/**
 * Ранжирование объектов
 * 
 * @param {Object} params
 * @param {Object} segments
 * @returns {String}
 */
export function getRanking(params, segments) {   
    params.limit = params.limit || 10;

    return `
        {ranking ${ t(params) } {
            countEntities
            entities {
                ${ entityFields } 
                ${ renderFragments(segments) }
            }
        }
    }`;
}


/**
 * Получение списка объектов
 * 
 * @param {Object} params
 * @param {Object} segments
 * @returns {String}
 */
export function findAll(params, segments) {   
    params.limit = params.limit || 10;

    return `
        {entities ${ t(params) }  {
            ${ entityFields } 
            ${ renderFragments(segments) }
        }
    }`;
}


/**
 * Добавление галлереи к объекту
 * 
 * @param {Object} params
 * @returns {String}
 */
export function addGallery(params) {
    return `
        mutation {addGalleryToEntity ${ t(params) } {
			result
		}
    }`;
}


/**
 * Получение одного объекта по идентификатору
 * 
 * @param {Object} params
 * @param {Object} options
 * @returns {String}
 */
export function findById(params, segments) {       
    return `
        {entity ${ t(params) } {
            ${ entityFields } 
            ${ renderFragments(segments) }
        }
    }`;
}


/**
 * Создание объекта
 * 
 * @param {Object} params
 * @returns {String}
 */
export function create(params) {
    if ('description' in params) {
        let desc = escape(params.description);
        params.description = `""${desc}""`;
    }
    
    return `
        mutation {createEntity ${ t(params) }  {
            ${ entityFields } 
        }
    }`;
}


/**
 * Обновление объекта
 * 
 * @param {Object} params
 * @returns {String}
 */
export function update(params) {
    if ('description' in params) {
        let desc = escape(params.description);
        params.description = `""${desc}""`;
    }

    return `
        mutation {updateEntity ${ t(params) }  {
            ${ entityFields } 
        }
    }`;
}


/**
 * Добавление объекта в сферу
 * 
 * @param {Object} params
 * @returns {String}
 */
export function addToSphere(params) {
    return `mutation {
		addEntityToSphere ${ t(params) } {
			result
		}
	}`;
}


/**
 * Добавить свойство к объекту
 * 
 * @param {Object} params
 * @returns {String}
 */
export function setProperty(params) {
    return `
        mutation {addPropertyToEntity ${ t(params) } {
                id
            }
        }`;
}


/**
 * Получить награды объекта
 * 
 * @param {Object} params
 * @returns {String}
 */
export function getMedals(params) {
	return `
		{ medals ${ t(params) } {
			criterion {
				id
				label
			}
			place
			value
			countScores
			locationType
			properties {
				id
				op
				label
				value
				kind
				units
				items {
					id
					label
				}
			}
		}
	}`
}