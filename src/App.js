import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./compo/Layout"
import Home from "./compo/home/Home";
import GameDetails from "./compo/gameDetails/GameDetails";
import Developers from "./compo/developers/Developers";
import Login from "./compo/login/Login";
import Profile from "./compo/profile/Profile";
import DevelopersDetails from "./compo/developersDetails/DevelopersDetails";


import { DevsProvider } from "./providers/DevsProviders";
import { GamesProvider } from "./providers/GamesProvider";
import { UserProvider } from "./providers/UserProvider";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <GamesProvider>
          <DevsProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games/details/:gameId" element={<GameDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />}/>
                <Route path="/Developers" element={<Developers />} />
                <Route path="/developers/details/:devsId" element={<DevelopersDetails />} />
              </Routes>
            </Layout>
          </DevsProvider>
        </GamesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
