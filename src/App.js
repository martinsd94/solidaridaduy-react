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
import { config, dummy_locations, dummy_categories } from "./constants";

/* Helpers */
import { parseApiData } from "./helpers/parsers";

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
  const [locationData, setLocationData] = useState(dummy_locations);
  const [categoryData, setCategoryData] = useState(dummy_categories);

  // ------------------------------------------------

  const loadData = () => {
    window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.spreadsheetId,
          range: config.range,
        })
        .then(
          (response) => loadSuccessful(response),
          (err) => loadFailure(err)
        );
    });
  };

  const loadSuccessful = (response) => {
    const initiatives = parseApiData(response);
    setData(initiatives);
    setIsDataFetching(false);
  };

  const loadFailure = (err) => {
    console.log(err);
    console.log("Algo salio mal!");
  };

  const initClient = () => {
    // Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs,
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
