import React, { Fragment, useEffect, useState } from "react";

import { useLocation, Link } from "react-router-dom";

/* Components */
import LoadingAnimation from "../components/LoadingAnimation";

/* Helpers */
import { filterByName } from "../helpers/filterByName";

/* Styles */
import "../main.scss";
import "../styles/search-results.scss";

/* Data hooks */
import { useData } from "../context/data";

/* Svgs */
import CategorySvg from "../components/CategorySvg";

const SearchResultsView = () => {
  const query = new URLSearchParams(useLocation().search);
  const [search, setSearch] = useState(query.get("search"));
  const [province, setProvince] = useState(undefined);
  const [hood, setHood] = useState(undefined);

  return (
    <Fragment>
      <SearchBar
        hood={hood}
        province={province}
        value={search}
        _setValue={setSearch}
      />
      <SearchResults search={search} />
    </Fragment>
  );
};

/* Local components */

const SearchBar = ({ hood, province, value, _setValue }) => {
  return (
    <div className="searchbar">
      <div className="field-wrapper">
        <input
          value={value}
          placeholder="Buscar por nombre..."
          onChange={(e) => _setValue(e.target.value)}
        />
      </div>
      <div className="field-wrapper">
        <select value={province}>
          <option>Ciudad...</option>
          <option></option>
          <option></option>
        </select>
      </div>
      <div className="field-wrapper">
        <select value={hood}>
          <option>Depart...</option>
          <option></option>
          <option></option>
        </select>
      </div>
    </div>
  );
};

//

const SearchResults = ({ search }) => {
  const [initiatives, setInitiatives] = useState(null);

  const { data, isDataFetching } = useData();
  const [filteredData, setFilteredData] = useState([]);

  // Fetch initiative data
  useEffect(() => {
    setFilteredData(filterByName(data, search));
    /*fetch('http://localhost:5000/initiatives/search', {
			crossDomain: true,
			method: 'GET'
		})
			.then(response => response.json())
			.then(data => setInitiatives(data));*/
  }, [setFilteredData, data, search]);

  const renderInitiatives = () => {
    if (!isDataFetching) {
      return (
        <div className="results-container">
          {filteredData.slice(0, 20).map((init, index) => (
            <Initiative initiative={init} index={index} key={index} />
          ))}
        </div>
      );
    } else {
      return <LoadingAnimation />;
    }
  };

  return <Fragment>{renderInitiatives()}</Fragment>;
};

const Initiative = ({ initiative, index }) => {
  const { _id, name, category, hood, province, emergency } = initiative;

  // If emergency is true, use associated class
  let emergency_class = "";
  if (emergency) {
    emergency_class = " emergency";
  }

  return (
    <Link
      to={`/initiative/${_id}`}
      className={`initiative-card${emergency_class}`}
    >
      <div className="hover-effect"></div>
      <h4 className="name">{name}</h4>
      <p className="location">
        {`${hood}`}
        <br />
        {province}
      </p>
      <CategorySvg category={category} emergency={emergency} />
    </Link>
  );
};

export default SearchResultsView;
