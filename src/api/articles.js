import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';

const articleFragment = `
	id
	alias
	title
	sphereID 
	published
	mainMedia ${fragments.mediaData}
	author {
		id
		name
		login
		mainMedia ${fragments.mediaData}
	}
	sphere {
		id
		label
		mainMedia ${fragments.mediaData}
	}
	useless
	useful
	countViews
	countComments
	createdAt
`;


/**
 * Получить статью по идентификатору
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function findById(props) { 
	let params = {};

	if ('id' in props) {
		let digits = /^\d+$/;
		let key = 'id';

		if (!digits.test(props.id)) {
			key = 'alias';
		}

		params[key] = props.id;
	} else {
		params = props;
	}
	
    return `
        {article ${ t(params) } {
			content
			entity {
				id
				label
				mainMedia ${fragments.mediaData}
			}
            ${ articleFragment }
        }
    }`;
}


/**
 * Поиск всех статей
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params) {      
    return `
        {articles ${ t(params) } {
			preamble
            ${ articleFragment }
        }
    }`;
}


/**
 * Создание статьи
 * 
 * @param {type} params
 * @returns {String}
 */
export function create(params) {
    if ('content' in params) {
		let content = params.content;
		params.content = `""${content}""`;
    };
   
    return `
        mutation {createArticle ${ t(params) } {
            id
        }
    }`;
}


/**
 * Обновление статьи
 * 
 * @param {type} params
 * @returns {String}
 */
export function update(params) {
    if ('content' in params) {
		let content = params.content;
		params.content = `""${content}""`;
    };
    
    return `
        mutation {updateArticle ${ t(params) } {
            id
        }
    }`;
}