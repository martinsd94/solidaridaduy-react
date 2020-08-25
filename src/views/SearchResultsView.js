import React, { Fragment, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import levenshtein from "fast-levenshtein";
import { getKeywords, filterBySearch } from "../helpers/searchFunctions";

/* Components */
import LoadingAnimation from "../components/LoadingAnimation";

/* Styles */
import "../main.scss";
import "../styles/search-results.scss";

/* Data hooks */
import { useData } from "../context/data";

/* Svgs */
import CategorySvg from "../components/CategorySvg";

const SearchResultsView = () => {
  const query = new URLSearchParams(useLocation().search);
  const searchUrl = query.get("search") || "";
  const provinceUrl = query.get("province") || "";
  const hoodUrl = query.get("hood") || "";
  const categoryUrl = query.get("category") || "";

  const [search, setSearch] = useState(searchUrl);
  const [province, setProvince] = useState(provinceUrl);
  const [category, setCategory] = useState(categoryUrl);
  const [hood, setHood] = useState(hoodUrl);

  return (
    <Fragment>
      <SearchBar
        province={province}
        hood={hood}
        search={search}
        category={category}
        _setSearch={setSearch}
        _setProvince={setProvince}
        _setHood={setHood}
        _setCategory={setCategory}
      />
      <SearchResults
        search={searchUrl}
        province={provinceUrl}
        hood={hoodUrl}
        category={categoryUrl}
      />
    </Fragment>
  );
};

/* Local components */

const SearchBar = ({
  hood,
  province,
  search,
  category,
  _setSearch,
  _setProvince,
  _setHood,
  _setCategory,
}) => {
  const { locationData, categoryData } = useData();

  const searchUrl = () => {
    let url = "/search-results?";
    if (search) {
      url = `${url}&search=${search}`;
    }
    if (category) {
      url = `${url}&category=${category}`;
    }
    if (province) {
      url = `${url}&province=${province}`;
      if (hood) {
        url = `${url}&hood=${hood}`;
      }
    }
    return url;
  };

  return (
    <div className="searchbar">
      <div className="field-wrapper name-input">
        <input
          value={search}
          placeholder="Buscar por nombre..."
          onChange={(e) => _setSearch(e.target.value)}
        />
      </div>
      <Link to={searchUrl()}>
        <button className="button-green">
          <FaSearch />
        </button>
      </Link>
      <div className="field-wrapper select">
        <select
          value={province}
          onChange={(e) => {
            _setProvince(e.target.value);
            _setHood(undefined);
          }}
        >
          <option value="">Depart...</option>
          {Object.keys(locationData).map((item, index) => (
            <option key={index} value={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="field-wrapper select">
        <select
          value={hood}
          onChange={(e) => {
            _setHood(e.target.value);
          }}
        >
          <option value="">Barrio...</option>
          {province !== ""
            ? locationData[Object.keys(locationData)[province]].map(
                (item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                )
              )
            : null}
        </select>
      </div>
      <div className="field-wrapper select">
        <select
          value={category}
          onChange={(e) => {
            _setCategory(e.target.value);
          }}
        >
          <option value="">Tipo...</option>
          {categoryData.map((item, index) => (
            <option key={index} value={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

//

const SearchResults = ({ search, province, hood, category }) => {
  const { data, isDataFetching, locationData, categoryData } = useData();
  const [filteredData, setFilteredData] = useState([]);

  const filterByProvince = (data) => {
    return data.filter(
      (elemt) => elemt.province === Object.keys(locationData)[province]
    );
  };

  const filterByHood = (data) => {
    return data.filter(
      (elemt) =>
        elemt.hood === locationData[Object.keys(locationData)[province]][hood]
    );
  };

  const filterByCategory = (data) => {
    return data.filter((elemt) => elemt.category === categoryData[category]);
  };

  // Fetch initiative data
  useEffect(() => {
    let filt = [...data];
    if (search !== "") {
      filt = filterBySearch(filt, search);
    }
    if (category && category !== "") {
      filt = filterByCategory(filt);
    }
    if (province && province !== "") {
      filt = filterByProvince(filt);
      if (hood && hood !== "") {
        // Province MUST be set for a hood to be available
        filt = filterByHood(filt);
      }
    }

    setFilteredData(filt.slice(0, 15));
  }, [data, search, province, hood, category]);

  const renderInitiatives = () => {
    if (!isDataFetching) {
      return (
        <div className="results-container">
          {filteredData.length !== 0 ? (
            filteredData
              .slice(0, 15)
              .map((init, index) => (
                <Initiative initiative={init} index={index} key={index} />
              ))
          ) : (
            <p className="no-results">
              No hay resultados que coincidan con su búsqueda.
            </p>
          )}
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
