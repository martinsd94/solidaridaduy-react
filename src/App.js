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

/* Helpers */
import { randomString } from './helpers/randomString';

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
    const [isDataFetching, setIsDataFetching] = useState(true);

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
        const initiatives = response.result.values.map(ini => ({
            // TODO: Assign random id!
            _id:      randomString(18,'aA#'),
            name:     ini[indices.name],
            address:  ini[indices.address],
            province: ini[indices.province],
            hood:     ini[indices.hood],
            category: ini[indices.category],
            contact_phones: ['098123456', '097561626', '098196558'],
            geolocation: {
                latitude:  ini[indices.latitude],
                longitude: ini[indices.longitude]
            },
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at tincidunt mi. Aliquam imperdiet mauris quam, vel dapibus mauris posuere sit amet. Ut placerat volutpat interdum. Sed vulputate nisl eget nunc lacinia, quis auctor risus tristique. In ornare euismod sapien quis auctor. Fusce faucibus, lorem ut dignissim tincidunt, quam purus posuere erat, ac malesuada elit lacus vitae orci. Sed tristique, est quis euismod tempor, sem massa sodales massa, a sollicitudin eros odio quis mi. Quisque suscipit convallis malesuada. Duis vehicula purus non feugiat scelerisque. Praesent venenatis urna orci, id auctor augue consectetur in. Donec vitae est ut tortor posuere venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas non eleifend lacus. Integer in venenatis orci, non tristique turpis. Quisque luctus ligula sit amet efficitur luctus.',
            emergency: (ini[indices.category] === 'SI') ? true : false,
            activities: {
                sun: [],
                mon: [{ start: 9, duration: 5 }],
                tue: [{ start: 9, duration: 5 }],
                wed: [{ start: 9, duration: 5 }],
                thu: [{ start: 9, duration: 5 }],
                fri: [{ start: 9, duration: 5 }],
                sat: [],
            }
        }));
        setData(initiatives);
        setIsDataFetching(false);
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
            contact_phones: labels.indexOf('Número de contacto'),
            latitude:  labels.indexOf('Coordenada Latitud'),
            longitude: labels.indexOf('Coordenada Longitud'),            
            emergency: labels.indexOf('¿Emergencia?')
        }
    }

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
    }, [])

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
                                            data,
                                            isDataFetching
                                        }}>
                <Router>
    				<AppRoutes />
    			</Router>
            </DataContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
