import mongoose, { Schema } from 'mongoose';

// Define an interface representing a Follow document

// Define the Follow schema
const FollowSchema: Schema= new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Follow model
const FollowModel = mongoose.model('Follow', FollowSchema);

// Export the Follow model
export default FollowModel;