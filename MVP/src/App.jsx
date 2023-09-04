import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { User, Event,AddNewEvent, Header, Footer } from "./components";


// export default App;
import { Amplify } from 'aws-amplify';

import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <ThemeProvider>
        <Router>
            <Header user={user} />
            <Routes>
              <Route path="/" element={<Event />} />
              
               <Route path="/event/" element={<Event />} />
              
               <Route
                path="/add-new-event/"
                element={<AddNewEvent/>}
              />
              <Route
                path="/users/"
                element={<User/>}
              />
              
            </Routes>
            <Footer></Footer>
        </Router>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);