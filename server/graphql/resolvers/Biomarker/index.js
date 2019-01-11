import Biomarker from '../../../models/Biomarker';

export default {
    Query: {
      biomarker: async (parent, {name}, context, info) => {
        return await Biomarker.findOne({name: name}).exec();
      },
      biomarkers: async (parent, args, context, info) => {
		return await Biomarker.find({}).exec();
      }
    },
    Mutation: {
      createBiomarker: async (parent, args, context, info) => {
        const newUser = await new User({
          name: args.name
        });
  
        return new Promise((resolve, reject) => {
          newUser.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      }
    }
}