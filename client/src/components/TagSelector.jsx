import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const TagSelector = ({ tags, setTags }) => {
  const [availableTags, setAvailableTags] = useState([]); // Existing tags from backend
  const [selectedTag, setSelectedTag] = useState(""); // Selected tag from dropdown
  const [newTag, setNewTag] = useState(""); // New tag entered manually
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility

  const dropdownRef = useRef(null); // Ref for detecting outside clicks

  // Fetch tags from the backend
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/tags")
      .then((response) => {
        setAvailableTags(response.data.tags || []);
      })
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const addTag = () => {
    const tagToAdd = selectedTag || newTag;

    // Prevent adding empty or duplicate tags
    if (!tagToAdd || tags.includes(tagToAdd)) {
      console.error("Tag is empty or already added.");
      return;
    }

    if (newTag) {
      // Add new tag to backend and update the state
      axios
        .post("http://localhost:9000/api/tags", { name: newTag })
        .then((response) => {
          setTags([...tags, newTag]);
          setAvailableTags([...availableTags, response.data]);
          setNewTag(""); // Clear new tag input
        })
        .catch((error) => {
          console.error("Failed to add new tag:", error.response ? error.response.data : error.message);
        });
    } else if (selectedTag) {
      setTags([...tags, selectedTag]);
      setSelectedTag(""); // Clear selected tag input
      setShowDropdown(false); // Hide dropdown after selecting tag
    }
  };

  // Filter tags based on the search query
  const filteredTags = Array.isArray(availableTags)
    ? availableTags.filter((tag) => {
        if (tag && tag.name) {
          return selectedTag
            ? tag.name.toLowerCase().includes(selectedTag.toLowerCase())
            : true; // Return all tags if selectedTag is empty
        }
        return false; // Exclude invalid tag objects
      })
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4" ref={dropdownRef}>
      {/* Tag input field */}
      <div className="relative">
        {/* Input for selecting/searching tags */}
        <input
          type="text"
          placeholder="Search or select a tag"
          value={selectedTag}
          onChange={(e) => {
            setSelectedTag(e.target.value);
            setShowDropdown(true); // Show dropdown while typing
          }}
          className="border rounded-lg px-4 py-2 w-full shadow focus:outline-none focus:border-green-500"
        />

        {/* Dropdown suggestions */}
        {showDropdown && (
          <div className="absolute left-0 right-0 mt-2 max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => {
                    setSelectedTag(tag.name); // Select the tag
                    setShowDropdown(false); // Close dropdown after selection
                  }}
                >
                  {tag.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No tags found</div>
            )}
          </div>
        )}
      </div>

      {/* New tag input field */}
      <input
        type="text"
        placeholder="Or create a new tag"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />

      {/* Add Tag button */}
      <button
        onClick={addTag}
        className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Add Tag
      </button>
    </div>
  );
};

// PropTypes validation
TagSelector.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
};

export default TagSelector;