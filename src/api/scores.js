import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';

let scoreFragment = `{
    id
    value
    createdAt
	countMedia
	media ${fragments.mediaData}
    sphere {
        id
        name
        label
		mainMedia ${fragments.mediaData}
    }
    criterion {
        id
        label
    }
    entity {
        id
        label
        mainMedia ${fragments.mediaData}
    }
    user {
        id
        name
		login
        mainMedia ${fragments.mediaData}
        karma
    }
    argument 
	useless
	useful
	countReplies
}`;


/**
 * Сохранение оценки
 * 
 * @param {Object} params
 * @returns {String}
 */
export function save(params) {
    if ('argument' in params) {
        let argument = params.argument.replace(/(?:\r\n|\r|\n)/g, '\n');
        params.argument = `""${argument}""`;
    }   
        
    return `
        mutation {createScore ${ t(params) } 
            ${ scoreFragment }
        }`;
}


/**
 * Получение оценок
 * 
 * @param {Object} params
 * @returns {String}
 */
export function find(params) {
    params.limit = params.limit || 10;
    
    return `
        {scores ${ t(params) }
            ${ scoreFragment }
        }`; 
}


/**
 * Получение оценки по идентификатору
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findById(params) {
    return `
        {score ${ t(params) } 
            ${ scoreFragment }
        }`; 
}


/**
 * Получение оценок, которых несколько для одного объекта
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findTops(params) {
    return `
        {topScores ${ t(params) } { 
            value
            place
            argument
            entity {
                id
                mainMedia ${fragments.mediaData}
                label
            }
            criterion {
                id
                label
            }
            sphere {
                id
                label
            }
        }
    }`; 
}


/**
 * Получение статистки по оценкам
 * 
 * @param {Object} params
 * @returns {String}
 */
export function getStatistic(params) {
    return ` 
        {scoresStatictic ${ t(params) } {
            roundedValue
            count
        }
    }`; 
}


/**
 * Получение средних оценок
 * 
 * @param {Object} params
 * @returns {String}
 */
export function avgScores(params) {
    return `{ ${fragments.avgScores(params)} }`; 
}