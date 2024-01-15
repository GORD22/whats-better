import config from 'config';

import request from 'api-helpers/request';
import requestGroup from 'api-helpers/requestGroup';
import toGqlRequest from 'api-helpers/toGqlRequest';
import queue from 'api-helpers/queue';
import get from 'api-helpers/get';
import post from 'api-helpers/post';

import headers, { 
	setHeader, 
	removeHeader, 
	getHeader 
} from './_headers';

const articles = require('./articles');
const battles = require('./battles');
const booking = require('./booking');
const chats = require('./chats');
const calendar = require('./calendar');
const comments = require('./comments');
const criteria = require('./criteria');
const criteriaGroups = require('./criteriaGroups');
const entities = require('./entities');
const feed = require('./feed');
const filters = require('./filters');
const galleries = require('./galleries');
const marketplaces = require('./marketplaces');
const media = require('./media');
const messages = require('./messages'); 
const notifications = require('./notifications');
const orders = require('./orders');
const posts = require('./posts');
const presets = require('./presets');
const properties = require('./properties');
const rateplans = require('./rateplans');
const reports = require('./reports');
const scores = require('./scores');
const search = require('./search');
const sphereProperties = require('./sphereProperties');
const spheres = require('./spheres');
const storage = require('./storage');
const usefulness = require('./usefulness');
const userAddresses = require('./userAddresses');
const users = require('./users');

const wrap = toGqlRequest.bind(null, config.apiServer, headers);
 

export default {
	articles: wrap(articles, 'articles'),
	battles: wrap(battles, 'battles'),
	booking: wrap(booking, 'booking'),
	chats: chats,
	comments: wrap(comments, 'comments'),
	calendar: calendar,
	criteria: wrap(criteria, 'criteria'),
	criteriaGroups: wrap(criteriaGroups, 'criteriaGroups'),
	entities: wrap(entities, 'entities'),
	feed: feed,
	filters: wrap(filters, 'filters'),
	galleries: wrap(galleries, 'galleries'),
	marketplaces: wrap(marketplaces, 'marketplaces'),
	media: wrap(media, 'media'),
	messages: messages,
	notifications: notifications,
	orders: wrap(orders, 'orders'),
	posts: wrap(posts, 'posts'),
	presets: wrap(presets, 'presets'),
	properties: wrap(properties, 'properties'),
	ratePlans: wrap(rateplans, 'rateplans'),
	reports: wrap(reports, 'reports'),
	scores: wrap(scores, 'scores'),
	search: wrap(search, 'search'),
	sphereProperties: wrap(sphereProperties, 'sphereProperties'),
	spheres: wrap(spheres, 'spheres'),
	storage: storage,
	usefulness: wrap(usefulness, 'usefulness'),
	userAddresses: wrap(userAddresses, 'userAddresses'),
	users: wrap(users, 'users'),
    request: (str, variables) => request({
		url: config.apiServer, 
		query: str, 
		caller: 'request', 
		headers, 
		variables
	}),
    requestGroup: (str) => request({
		url: config.apiServer, 
		query: requestGroup(str), 
		isGroup: true, 
		caller: 'request', 
		headers
	}),
    setHeader,
    getHeader,
    removeHeader,
    queue,
    get,
    post,
};

 
