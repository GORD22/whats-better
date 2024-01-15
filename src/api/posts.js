import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';

const fragmentsPost = `
	id
	text
	media {
		v
		type
		ext
		path
		storage
		sizes
	}
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
	entity {
		id
		label
	}
	useless
	useful
	countViews
	countComments
	createdAt
`;


/**
 * Поиск всех постов
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params) {      
    return `
        {posts ${ t(params) } {
            ${ fragmentsPost }
        }
    }`;
}


/**
 * Получение всех постов
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findById(params) {      
    return `
        {post ${ t(params) } {
            ${ fragmentsPost }
        }
    }`;
}


/**
 * Создать пост
 * 
 * @param {type} params
 * @returns {String}
 */
export function create(params) {
    if ('text' in params) {
		let text = params.text;
        text = text.replace(/\\([\s\S])|(")/g,'\\$1$2');
		text = text.replace(/(?:\r\n|\r|\n)/g, '\n');
		params.text = `""${text}""`;
    };

    return `
        mutation {createPost ${ t(params) } {
            id
        }
    }`;
}


/**
 * Обновить пост
 * 
 * @param {type} params
 * @returns {String}
 */
export function update(params) {
    if ('text' in params) {
		let text = params.text;
        text = text.replace(/\\([\s\S])|(")/g,'\\$1$2');
		text = text.replace(/(?:\r\n|\r|\n)/g, '\n');
		params.text = `""${text}""`;
    };
    
    return `
        mutation {updatePost ${ t(params) } {
            id
        }
    }`;
}