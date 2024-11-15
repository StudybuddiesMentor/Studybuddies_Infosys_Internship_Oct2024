import Tag from "../db/Tag.js";



 async function checkTag(inputtags) {

  const validatearray = [];
  const validtags = [];
  for(const inputtag of inputtags ){
    const userTag = inputtag.trim().toLowerCase();
    if (!isValid(userTag)) {
      validatearray.push({status:400,message:"No special characters are allowed in tag"});
      continue;
    }
    let checkTag = userTag.slice(0, -1);
   
    let isSimilar = false;
   const similartag = await Tag.find({ name: { $regex: `^${checkTag}` } });
  
for (let tag of similartag) {
     const taglength = tag.name.length;
     const inputtaglength = userTag.length;
      if (userTag.startsWith(tag.name) && Math.abs(inputtaglength - taglength) === 1 ) {
        validtags.push(tag.name); 
        isSimilar = true;
        break;
      }
    }
    if(!isSimilar){
      validtags.push(userTag);
    }
 }
 return { errors: validatearray, validtags };

  }

  function isValid(input){
    const expression = /^[A-Za-z\s]+$/;
    return expression.test(input);
  }

  export default checkTag;