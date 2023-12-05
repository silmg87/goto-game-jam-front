import Header  from './components/Header'
import Footer from './components/Footer';
import PrivateRoute from './components/Privateroute';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Home from './views/HomePage.jsx'
import About from './views/AboutPage.jsx';
import Games from './views/GamesPage.jsx';
import GameView from './views/GameViewPage.jsx';
import NotFound from './views/NotFoundPage.jsx';

import LoginPage from './views/LoginPage.jsx';
import RegisterPage from './views/RegisterPage.jsx';
import Dashboard from './views/DashboardPage.jsx';
import Panel from './views/UserProfilePage.jsx';

import ManageGames from './views/ManageGamesPage.jsx';
import EditGame from './views/EditGame.jsx';
import DeleteGame from './views/DeleteGame.jsx';
import CreateGame from './views/CreateGame.jsx';
import Votes from './views/VotesPage.jsx';
import CreateVote from './views/CreateVote.jsx';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainApp/>,
        errorElement: <NotFound/>,
        children: [
              {
                path: '',
                element: <Home/>,
              },
              {
                path: 'about',
                element: <About/>,
              },
              {
                path: 'games',
                element: <Outlet/>,
                children: [
                    {
                      path: '',
                      element: <Games/>,
                    },
                    {
                      path: ':idGame',
                      element: <GameView/>,
                    }
                ]
              },
              {
                path: 'dashboard',
                element: <PrivateRoute><Outlet/></PrivateRoute>,
                children: [
                  {
                    path: '',
                    element: <Dashboard/>,
                  },
                  {
                    path: 'manage-games',
                    element: <ManageGames/>,
                  },
                  {
                    path: 'edit-game/:idGame',
                    element: <EditGame/>,
                  },
                  {
                    path: 'add-game',
                    element: <CreateGame/>,
                  },
                  {
                    path: 'delete-game/:idGame',
                    element: <DeleteGame />,
                  }
              ]
              },
              {
                path: 'panel',
                element: <PrivateRoute><Outlet /></PrivateRoute>,
                children: [
                  {
                    path: '',
                    element: <Panel />,
                  },
                  {
                    path: 'votes',
                    element: <Votes />,
                  },
                  {
                    path: 'add-vote/:idGame',
                    element: <CreateVote />,
                  },
                  {
                    path: 'games',
                    element: <ManageGames />,
                  },
                ]
              },
        ]
    },
    {
      path: '/login',
      element: <LoginPage/>,
    },
    {
      path: '/register',
      element: <RegisterPage/>,
    }
]);

export default function App() {

    return (
        <>
          <RouterProvider router={router} />
        </>
    )
}

function MainApp() {
    return(
        <>
            <Header />
                <Outlet />
            <Footer />
        </>
  )
}