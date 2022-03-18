import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaChevronRight } from 'react-icons/fa';

import { TrieTree } from '../assets/trietree';

const SearchContainer = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: #fff;
  form {
    width: 355px;
  }
  span {
    margin: 14px 0px 14px 14px;
    position: absolute;
  }
`;

const SearchInput = styled.input`
  color: #3d3d3d;
  font-size: 16px;
  width: -webkit-fill-available;
  margin-left: 30px;
  padding: 13px;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #878787;
    font-size: 16px;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #3d3d3d;
`;

const SearchResultIcon = styled(FaChevronRight)`
  color: #3d3d3d;
  margin-right: 14px;
`;

const SearchListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0px 12px 12px 12px;
  form {
    width: 285px;
  }
  li {
    margin-top: 9px;
    a {
      color: #3d3d3d;
      display: flex;
      align-items: center;
      width: auto;
      padding: 7px;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #eaeaea;
      }
    }
  }
`;

const ListingDivider = styled.div`
  height: 2px;
  background-color: #eaeaea;
`;
// **** END SEARCH BAR STYLES ****

/*
 * Adds a submited search term to the tree.
 */
const handleTermSubmit = (e, search, setSearch, disableTermSubmit) => {
  e.preventDefault();

  const { searchTree, searchTerm } = search;

  // Checks to see if the user didn't disabled adding a new term to the tree on submit
  if (!disableTermSubmit) {
    searchTree.insert(searchTerm);
  }
  setSearch({ searchTree, searchTerm: '' });
};

/*
 * Sets the searchTerm state and passes the changed value
 */
const handleTermChange = (e, searchTree, setSearch, onChange) => {
  setSearch({ searchTree, searchTerm: e.target.value });

  if (onChange) {
    onChange(e.target.value);
  }
};

/*
 * Handles accepting an optional words to put in the state.
 */
const handleWords = (searchTerm, setSearch, words) => {
  setSearch({
    searchTree: new TrieTree(words),
    searchTerm: searchTerm,
    searchWords: true,
  });
};

/*
 * Displays dropdown items of completed prefix terms from the trie tree if any.
 */
const displayResults = (searchResults) => {
  const resultListElement = searchResults.map((result, i) => {
    return (
      <li key={i}>
        <a href="#">
          <SearchResultIcon />
          {result}
        </a>
      </li>
    );
  });
  return resultListElement;
};

export function SearchBar(props) {
  // Destructure the values out of props and give necessary default values
  const {
    placeholder = 'Búsqueda...',
    type = 'text',
    words = [],
    disableTermSubmit = false,
  } = props;

  // Create component state
  const [search, setSearch] = useState({
    searchTree: new TrieTree(),
    searchTerm: '',
    searchWords: false,
  });

  // Destructure the values out of state
  const { searchTree, searchTerm, searchWords } = search;

  // Check if a words was added to the tree
  if (!searchWords && words.length > 0) {
    // Creates a new searchTree with the words
    handleWords(searchTerm, setSearch, words);
  }

  // Retrieves all the search term completions
  const searchResults = searchTree.complete(searchTerm);

  // Prevents LastPass app error when you submit
  useEffect(() => {
    document.addEventListener('keydown', (e) => e.stopPropagation(), true);

    // Unmount the event listener
    return () => {
      document.removeEventListener('keydown', (e) => e.stopPropagation(), true);
    };
  }, []);

  return (
    <SearchContainer>
      <span>
        <SearchIcon />
      </span>
      <form
        onSubmit={(e) =>
          handleTermSubmit(e, search, setSearch, disableTermSubmit)
        }
      >
        <SearchInput
          type={type}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleTermChange(e, searchTree, setSearch)}
        />
        {searchResults.length > 0 ? (
          <>
            <ListingDivider />
            <SearchListContainer>
              {displayResults(searchResults)}
            </SearchListContainer>
          </>
        ) : null}
      </form>
    </SearchContainer>
  );
}
