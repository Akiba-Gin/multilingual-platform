import mongoose from 'mongoose';

const TranslationSchema = new mongoose.Schema({
  language: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const TopicSchema = new mongoose.Schema(
  {
    topicId: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    translations: [TranslationSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Topic', TopicSchema);
