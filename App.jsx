import React from 'react';
import Routes from "./src/routes/Routes";
import { Provider } from 'jotai'
import {UserDataContextProvider} from "./src/context/UserDataContext";


const App = () => {
    return <Provider>
        <UserDataContextProvider>
            <Routes />
        </UserDataContextProvider>
    </Provider>
}

export default App;
