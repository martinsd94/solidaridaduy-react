import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

/* Context */
import { AuthContext } from "./context/auth";
import { DataContext } from "./context/data";

/* Router */
import AppRoutes from "./router/AppRouter";

/* Styles */
import "./main.scss";

/* Constants */
import { data_config, location_config, categories } from "./constants";

/* Helpers */
import { parseApiData, parseApiLocations } from "./helpers/parsers";

//
//

const App = () => {
  // Auth Context States ---------------------------------------------
  // Load existing tokens any exist
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const existingAdmin = JSON.parse(localStorage.getItem("admin"));

  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [currentAdmin, setCurrentAdmin] = useState(existingAdmin);

  const setTokens = (data) => {
    // Update tokens on local storage
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const setAdmin = (data) => {
    // Update tokens on local storage
    localStorage.setItem("admin", JSON.stringify(data));
    setCurrentAdmin(data);
  };

  const authHeaders = () => {
    if (authTokens) {
      return {
        authorization: `Bearer ${authTokens}`,
      };
    } else {
      return {};
    }
  };

  // Data Context States ---------------------------------------------
  const [data, setData] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [categoryData, setCategoryData] = useState(categories);

  // ------------------------------------------------

  const loadData = () => {
    window.gapi.client.load("sheets", "v4", () => {
      // Load location data
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: location_config.spreadsheetId,
          range: location_config.range,
          majorDimension: "COLUMNS",
        })
        .then(
          (response) => parseLocations(response),
          (err) => console.log(err)
        );

      // Load initiaties
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: data_config.spreadsheetId,
          range: data_config.range,
        })
        .then(
          (response) => parseData(response),
          (err) => loadFailure(err)
        );
    });
  };

  const parseData = (response) => {
    const initiatives = parseApiData(response);
    setData(initiatives);
    setIsDataFetching(false);
  };

  const parseLocations = (response) => {
    const locations = parseApiLocations(response);
    setLocationData(locations);
    //setIsDataFetching(false);
  };

  const loadFailure = (err) => {
    //TODO: Handle this differently... For example, if connection is lost during loading... What happens then?
    console.log(err);
    console.log("Algo salio mal!");
  };

  const initClient = () => {
    // Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: data_config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: data_config.discoveryDocs,
      })
      .then(() => {
        // 3. Initialize and make the API request.
        // The function has a callback for the data parsing
        loadData();
        //load(this.onLoad);
      });
  };

  useEffect(() => {
    window.gapi.load("client", initClient);
  }, []);

  // ------------------------------------------------

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens: setTokens,
        authHeaders: authHeaders,
        currentAdmin: currentAdmin,
        setCurrentAdmin: setAdmin,
      }}
    >
      <DataContext.Provider
        value={{
          data,
          isDataFetching,
          locationData,
          categoryData,
        }}
      >
        <Router>
          <AppRoutes />
        </Router>
      </DataContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
