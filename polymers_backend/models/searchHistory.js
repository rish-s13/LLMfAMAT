import mongoose from 'mongoose';

const { Schema } = mongoose;

const searchHistorySchema = new Schema({
  query: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);
export default SearchHistory;