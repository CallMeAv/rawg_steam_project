import { createContext, useState, useEffect, useContext } from "react"
import { useSearchParams } from "react-router-dom";


const baseUrl = "https://api.rawg.io/api";
const key = "4519bc8b96b94de5a7979ad661d4c5bd";

const GamesContext = createContext();

export const useGameContext = () => {
    const context = useContext(GamesContext);
    return context;

}

const getGames = async () => {
    const result = await fetch(`${baseUrl}/games?key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }

    })
    return await result.json();
}

const getGameById = async (id) => {
    const result = await fetch(`${baseUrl}/games/${id}?key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}


const getGamesBySearchQuery = async (query) => {
    const result = await fetch(`${baseUrl}/games?search=${query}&search_exact=true&key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}


const getAchievementsById = async (id) => {
    const result = await fetch(`${baseUrl}/games/${id}/achievements?key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

// const getGamePictures = async (id) => {
//     const result = await fetch(`https://api.rawg.io/api/games/${id}/screenshots`, {
//         method: "GET",
//         headers: {
//             "content-type": "application/json; charset=utf-8"
//         }
//     });
//     return await result.json();
// }

export const GamesProvider = ({ children }) => {
    const [games, setGames] = useState();
    const [gameDetails, setGameDetails] = useState([]);
    // const [gamePictures, setGamePictures] = useState();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const fetchData = async () => {
            const searchQuery = searchParams.get("query");
            if (searchQuery) {
                setGames(await getGamesBySearchQuery(searchQuery));
            }
            else {
                setGames(await getGames());
            }
        }
        fetchData();
    }, [searchParams.get("query")]);


    const findById = async (id) => {
        //har vi cachet et spil?
        const foundGame = gameDetails.find(game => game.id == id);
        if (foundGame) {
            return foundGame;
        }
        else {
            const game = await getGameById(id);
            if (game) {
                setGameDetails(prevData => [...prevData, game]);
                return game;
            }
        }

    }

    // const findScreenshotsById = async (id) => {
    //     const Screenshot = await getScreenshotsById(id);
    //     if (Screenshot) {
    //         setGamePictures(prevData => [...prevData, Screenshot]);
    //         return Screenshot;
    //     }
    // }

    const findAchievementsById = async (id) => {
        const achievements = await getAchievementsById(id);
        if (achievements) {
            return achievements;
        }
    }

    return (
        <GamesContext.Provider value={{ games, findById, findAchievementsById }}>
            {children}
        </GamesContext.Provider>
    )
}