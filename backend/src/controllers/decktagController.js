import Deck from "../db/Deck.js";
import DeckTag from "../db/DeckTag.js";
import Tag from "../db/Tag.js";



//delete tags in deck
export const deleteDeckTag = async (req, res) => {
    const { tags } = req.body;
   
  
    try {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      const validtags = tagArray.map(tag => tag.trim().toLowerCase());
    const deck = await Deck.findById(req.params.deckId);

      if (!deck) {
        return res.status(404).json({ message: "Deck not found." });
      }
  
      if (validtags.length > 0) {

        const searchtags = await Tag.find({ name: { $in: validtags } });
        
       if (searchtags.length === 0) {
          return res.status(404).json({ message: "No tags found." });
        }
       for(const searchtag of searchtags){
        const decktag = await DeckTag.findOneAndDelete({$and:[{deck_id:deck._id},{tag_id:searchtag._id}]})
       
        if(!decktag){
            return res.status(404).json({message:"Requested tag is not present in deck you are looking"});
        }
       }
       return res.status(200).json({ message: "Tags successfully deleted from deck." });

       }
       return res.status(404).json({message:"No Tags are provided"})
    }catch (error) {
     
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  