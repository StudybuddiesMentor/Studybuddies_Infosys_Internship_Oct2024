import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import axios from "axios";

const TagSelector = ({ tags, setTags }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    // Fetch tags from backend
    axios.get("http://localhost:9000/api/tags")
      .then((response) => setAvailableTags(response.data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const addTag = () => {
    if (!newTag) {
      console.error("Tag name cannot be empty");
      return;
    }
  
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag("");
    } else if (newTag && !tags.includes(newTag)) {
      // Save new tag to backend with validation
      axios.post("http://localhost:9000/api/tags", { name: newTag })
        .then((response) => {
          setTags([...tags, newTag]);
          setAvailableTags([...availableTags, response.data]);
          setNewTag("");
        })
        .catch((error) => {
          console.error("Failed to add new tag:", error.response ? error.response.data : error.message);
        });
    }
  };
  

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Tags..."
        className="border rounded-full p-2"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      />
      <div className="dropdown">
        {availableTags.filter(tag => 
          tag.name.toLowerCase().includes(selectedTag.toLowerCase())
        ).map((tag, index) => (
          <div key={index} onClick={() => setSelectedTag(tag.name)}>
            {tag.name}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Or create a new tag"
        className="border rounded-full p-2 mt-2"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <button onClick={addTag} className="bg-green-500 text-white p-2 rounded mt-2">
        Add Tag
      </button>
    </div>
  );
};

// PropTypes validation
TagSelector.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired
};

export default TagSelector;