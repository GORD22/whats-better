import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';

let galleryFragment = (params) =>  `
    id
    countMedia
    media ${ t(params) } ${fragments.mediaData}`;


/**
 * Получить все галлереи
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params, limit = 10) {   
    return `
        {galleries ${ t(params) } {
            ${ galleryFragment({limit}) }
        }
    }`;
}


/**
 * Получить галлерею по идентификатору
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findById(params, limit = 10) {   
    return `
        {gallery ${ t(params) } {
			sphere {
				id
				label
				mainMedia ${fragments.mediaData}
			}
			author {
				id
				name
				login
				karma
				mainMedia ${fragments.mediaData}
			}
			entity {
				id
				label
				mainMedia ${fragments.mediaData}
			}
            ${ fragments.gallery({limit}) }
        }
    }`;
}


/**
 * Создать галлерею
 * 
 * @param {Object} params
 * @returns {String}
 */
export function create(params) {   
    return `
        mutation {createGallery ${ t(params) } {
            ${ galleryFragment({}) }
        }
    }`;
}


/**
 * Обновить галлерею
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function update(params) {
    return `
        mutation {updateGallery ${ t(params) } {
            ${ galleryFragment({}) }
        }
    }`;
}


/**
 * Добавить элемент в галерею
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function addMedia(params) {
    return `
        mutation {addMediaToGallery ${ t(params) } {
            result
        }   
    }`;
}


/**
 * Удалить элемент из галереи
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function removeMedia(params) {
    if (!params.galleryID) {
        throw new Error('Set ID to remove items in gallery');
    }
    return `
        mutation {removeMediaFromGallery ${ t(params) }  {
            result
        }
    }`;
}
