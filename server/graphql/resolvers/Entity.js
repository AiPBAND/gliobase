import Entity from '../../models/Entity';
import Category from '../../models/Category';
import Fuse from 'fuse.js';

export default {
    Query: {
      	entity: async (parent, {id}, context, info) => {
        	return await Entity.findOne({_id: id}).exec();
      	},
      	entities: async (parent, args, context, info) => {
			return await Entity.find({}).exec();
		},
		entitiesBySource: async (parent, {source}, context, info) => {
			return await Entity.find({ "sourceId" : source}).exec();
		},
		entitiesByCategory: async (parent, {category}, context, info) => {
			return await Entity.find({ "categoryId" : category} ).exec();
		},
		entitiesSearch: async (parent, {text}, context, info) => {
			if(text){
				const list = await Entity.find({}).exec();
				var options = {
					shouldSort: true,
					tokenize: true,
					findAllMatches: true,
					threshold: 0,
					location: 0,
					distance: 100,
					maxPatternLength: 32,
					minMatchCharLength: 1,
					keys: [
					  "id",
					  "name",
					  "abreviations",
					  "description"
				  ]
				  };
				  var fuse = new Fuse(list, options); // "list" is the item array
				  console.log(fuse.search(text))
				  return fuse.search(text);
			}else{
				return await Entity.find({}).exec();
			}
			
		}      
	},
	Entity: {
		category: async (entity) => {
			return await Category.findOne({_id: entity.categoryId}).exec();
		}
	}
}