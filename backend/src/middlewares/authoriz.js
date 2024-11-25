import Deck from "../db/Deck.js";


const isdeckOwner = async(req,res)=>{
    try{
        const{deckId} = req.params

        const deck = await Deck.findById(deckId);

        if (!deck) {
            return res.status(404).json({ message: "Deck not found" });
        }
        if(deck.created_by.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Access Denied: You are not authorized to modify this deck" });
        }
        next();
    }
    catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error", error:error.message });
    }
}



export default isdeckOwner;