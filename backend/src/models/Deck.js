import mongoose from 'mongoose';

const deckSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  cards: { type: Number, required: true },
  date: { type: String, required: true },
  likes: { type: Number, default: 0 }
});

// Use mongoose.models to avoid OverwriteModelError
export default mongoose.models.Deck || mongoose.model('Deck', deckSchema);