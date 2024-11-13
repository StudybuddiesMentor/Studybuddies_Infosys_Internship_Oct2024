import Tag from "../db/Tag.js";



 async function checkTag(inputtag) {
    const userTag = inputtag.trim().toLowerCase();
    if (!isValid(userTag)) {
      return {status:400,message:"No special characters are allowed in tag"}
    }
    const existtag = await Tag.findOne({ name: userTag });
   if(existtag){
     return {status:400,message:"the tag already exist please choose existing tag",existtag};
   }
    let checkTag = userTag.slice(0, -1);

   const similartag = await Tag.find({ name: { $regex: `^${checkTag}` } });
   console.log(similartag);
   for (let tag of similartag) {
     const taglength = tag.name.length;
     const inputtaglength = userTag.length;
      if (userTag.startsWith(tag.name) && Math.abs(inputtaglength - taglength) === 1 ) {
       return {status:400, message: "The similar tag already exists. Please choose an existing tag."};
      }
 
   //}
 }
 return null;
  }

  function isValid(input){
    const expression = /^[A-Za-z\s]+$/;
    return expression.test(input);
  }

  export default checkTag;