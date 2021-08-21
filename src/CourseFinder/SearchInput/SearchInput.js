import {useCallback} from "react";
import './SearchInput.scss';

function SearchInput({
  onSearchChange,
  onSubmitSearch,
  isError,
  searchText,
}) {
  const handleChange = useCallback((event)=> {
    onSearchChange(event.target.value);
  }, [])


  return (
    <div className="search-input">
      <label className="search-input__label">
        Course
      </label>
      <input
        className={`search-input__field ${isError ? 'search-input__field--error' : ''}`}
        placeholder="Enter course"
        onChange={handleChange}
      />
      <button className="search-input__button" disabled={!searchText} onClick={onSubmitSearch}>Submit</button>
      {isError && <span className="search-input__error">Error: Could not parse course</span>}
    </div>
  );
}

export default SearchInput;