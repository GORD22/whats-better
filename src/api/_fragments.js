import t from 'api-helpers/toGqlParams';

/** Свойства */
const fragments = {};


fragments.media = (params) =>  `media`;

fragments.mediaData =  `{
	v
	type
	path
	storage
	ext
	sizes
}`;

fragments.geo = () =>  `lat lng`;

fragments.gallery = (params) =>  `
    gallery {
        id
        countMedia
        items ${ t(params) } {
            v
			type
			path
			storage
			ext
			sizes
        }
    }`;

fragments.media = (params) =>  `
	media ${ t(params) } {
		v
		type
		path
		storage
		ext
		sizes
	}`;


fragments.childSpheres  = (params) =>  `
    childSpheres ${ t(params) } {
        id
        name
        description
        label
        mainMedia ${fragments.mediaData}
        countCriteria
        countEntities
        countSpheres
        countScores
    }`;

/** 
 * Родитель сферы
 */
fragments.spheres = (params) =>  `
spheres ${ t(params) } {
	id
	name
	label
}`;

fragments.sphere  = () =>  `
	sphere {
        id
        name
        label
		mainMedia ${fragments.mediaData}
    }`;


/** 
 * Родитель сферы
 */
fragments.parentSpheres = (params) =>  `
    parentSpheres ${ t(params) } {
        id
        name
        label
    }`;


/** 
 * Родитель сферы
 */
fragments.path = (params) =>  ` 
    path ${ t(params) } {
        id
        label
    }`;


/**
 * Свойства
 */
fragments.properties = (params) =>  `
    properties ${ t(params) } {
        id
        kind
        popular
        value
        label
        name
        units
        hideOnEntity
        itemsType
        items {
            id
            label
        }
        associatedSphereID 
    }`;

/**
 * Типы сфер
 */
fragments.types = (params) =>  ` 
    types ${ t(params) } {
        id
		name
        label
    }`;


/**
 * Награды
 */
fragments.medals = (params) => `
    medals ${ t(params) } {
        place
        value
        locationType
		countScores
		endDate
        criterion {
            id
            label
        }
    }`;


/**
 * Лучшие оценки
 */
fragments.topAvgScores = (params) => `
    topAvgScores ${ t(params) } {
        avgValue
        countScores
        criterion {
            id
            name
            label
        }
    }`;


/**
 * Худшие оценки 
 */
fragments.bottomAvgScores = (params) => `
    bottomAvgScores ${ t(params) } {
        avgValue
        countScores
        criterion {
            id
            name
            label
        }
    }`;


/**
 * Средние оценки 
 */
fragments.avgScores = (params) => `
    avgScores ${ t(params) } {
        avgValue
        countScores 
        criterion {
            id
            name
            label
        }
	}`;


/** 
 * Цены
 */
fragments.prices = (params) => `
    prices ${ t(params) }  {
        id
        value 
        link
        marketplace {
            id
            name
            label
            unitName
            dealName 
        }
    }`;


fragments.userCounters = () => `
    countFriends
    countSpheres
	countMySpheres
	countEntities
    countPosts
    countPresets
    countFollowers
	countGalleries
    countFollowing
    countReferrals
    countScores
	countBattles
	countVideo
	countClips
	countAudio
	countArticles

`;

fragments.userPrivateData = () => `
	phone
	email
	code
	login
	source
	secondName
`

fragments.roles = (params) => `
    roles ${ t(params) } {
        id
        name
    }
`;

fragments.karmaDetails = (params) => `
    karmaDetails ${ t(params) }  {
        countScores
        countSpheres
        items {
            sphere {
                id
                label
                mainMedia ${fragments.mediaData}
                name
            }
            countScores
        }
    }
`;

fragments.criteria  = (params) =>  `
    criteria ${ t(params) } {
        id
        name
        label
        countScores
    }`;

fragments.propertyItems  = (params) =>  `
    items ${ t(params) } {
        id
        label
        name
    }`;

fragments.propertySettings  = () =>  `
    hideOnEntity
    showInPreview 
    filterable 
    searchable 
    popular`;

fragments.criterionGroups  = () =>  `
    criterionGroups  {
        id
        name
        label
    }`;


const renderFragments = (items) => {
    if (!items) {
        return '';
    }

    let keys = Object.keys(items);
    let parts = [];

    for (let key of keys) {
		let part;

		if (typeof items[key] === 'string') {
			part = items[key]
		}

        if (typeof fragments[key] === 'function') {
            part = fragments[key](items[key]);
        }

		parts.push(part);
    }

    return parts.join(' ');
};

export {
    fragments,
    renderFragments
};