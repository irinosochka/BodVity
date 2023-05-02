import React, { Suspense } from 'react';
import Routes from "./src/routes/Routes";
import { Provider } from 'jotai'
import {UserDataContextProvider} from "./src/context/UserDataContext";

import './src/18n'



const App = () => {
    return(
        <Provider>
            <UserDataContextProvider>

                    <Routes />

            </UserDataContextProvider>
        </Provider>
    )
}

export default App;
