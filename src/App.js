import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

/* Context */
import { AuthContext } from './context/auth'; 
import { DataContext } from './context/data'; 

/* Router */
import AppRoutes from './router/AppRouter';

/* Styles */
import './main.scss';

/* Constants */
import { config } from './constants';

//
//

const App = () => {

	// Auth Context States ---------------------------------------------
    // Load existing tokens any exist
	const existingTokens = JSON.parse(localStorage.getItem('tokens'));
	const existingAdmin  = JSON.parse(localStorage.getItem('admin'));

	const [authTokens, setAuthTokens] = useState(existingTokens);
	const [currentAdmin, setCurrentAdmin] = useState(existingAdmin);

	const setTokens = (data) => {
		// Update tokens on local storage
		localStorage.setItem('tokens', JSON.stringify(data));
		setAuthTokens(data);
	}

	const setAdmin = (data) => {
    	// Update tokens on local storage
    	localStorage.setItem('admin', JSON.stringify(data));
    	setCurrentAdmin(data);    
	}

	const authHeaders = () => {
		if (authTokens) {
			return {
				authorization: `Bearer ${authTokens}`
			}
		}
		else {
			return {};
		}
	}


    // Data Context States ---------------------------------------------
    const [data, setData] = useState([]);

    // ------------------------------------------------

    const loadData = () => {
        window.gapi.client.load("sheets", "v4", () => {
             window.gapi.client.sheets.spreadsheets.values
                .get({
                    spreadsheetId: config.spreadsheetId,
                    range: config.range
                })
                .then((response) => loadSuccessful(response), (err) => loadFailure(err))
        });
    }

    const loadSuccessful = (response) => {
        const labels = response.result.values.shift();
        const indices = parseIndexes(labels);
        const initiatives = response.result.values.slice().map(ini => ({
            name:     ini[indices.name],
            address:  ini[indices.address],
            province: ini[indices.province],
            hood:     ini[indices.hood],
            category: ini[indices.category],
            contact_numbers: ini[indices.contact_numbers],
            geolocation: {
                latitude:  ini[indices.latitude],
                longitude: ini[indices.longitude]
            }
        }));
        console.log(initiatives);
    }

    const loadFailure = (err) => {
        console.log('Algo salio mal!');
    }

    const parseIndexes = (labels) => {
        return {
            name:      labels.indexOf('Organización'),
            address:   labels.indexOf('Dirección'),
            province:  labels.indexOf('Departamento'),
            hood:      labels.indexOf('Barrio/Localidad'),
            category:  labels.indexOf('Actividad/es'),
            contact_numbers: labels.indexOf('Número de contacto'),
            latitude:  labels.indexOf('Coordenada Latitud'),
            longitude: labels.indexOf('Coordenada Longitud'),            
        }
    }
    /*window.gapi.client.sheets.spreadsheets.values
        .get({
            spreadsheetId: config.spreadsheetId,
            range: config.range
        })
        .then(response => {
            console.log(response.result.values);
            const data = response.result.values;
            const cars = data.map(car => ({
                year: car[0],
                make: car[1],
                model: car[2]
            })) || [];
            callback({
                cars
            });
        },
        response => {
            callback(false, response.result.error);
        });
    }*/

    const initClient = () => {
        // Initialize the JavaScript client library.
        window.gapi.client
            .init({
                apiKey: config.apiKey,
                // Your API key will be automatically added to the Discovery Document URLs.
                discoveryDocs: config.discoveryDocs
            })
            .then(() => {
                // 3. Initialize and make the API request.
                // The function has a callback for the data parsing
                loadData();
                //load(this.onLoad);
            });
    }

    useEffect(() => {
        window.gapi.load("client", initClient);
    }, [initClient])

	// ------------------------------------------------

	return (
		<AuthContext.Provider value={{ 
										authTokens, 
										setAuthTokens: setTokens,
										authHeaders: authHeaders,
                    					currentAdmin: currentAdmin,
                    					setCurrentAdmin: setAdmin
									}}>
			<DataContext.Provider value={{
                                            data
                                        }}>
                <Router>
    				<AppRoutes />
    			</Router>
            </DataContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
