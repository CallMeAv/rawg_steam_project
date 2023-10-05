import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : undefined;
    });
    const [favorites, setFavotires] = useState(() => {
        const storedFavorites = localStorage.getItem(("userFavorites"));
        return storedFavorites ? JSON.parse(storedFavorites) : []
    });
    const [devsFavorites, setDevsFavorites] = useState([]);

    const handleLogin = async (email, password) => {
        const user = ({ email: email, username: "Marcus Schmidt" })
        // await new Promise(() => setTimeout(() => { }, 3000));
        setUser(user);
        localStorage.setItem("userData", JSON.stringify(user));
        return true;
    }

    const handleLogout = () => {
        setUser(undefined);
        localStorage.removeItem("userData")
    }

    const favoriteExists = (id) => {
        return favorites.some(f => f.id === id);
    }


    const handleAddFavorite = (id, name) => {
        const storedFavorites = localStorage.getItem("userFavorites");
        let tempFavoritesArray = storedFavorites ? JSON.parse(storedFavorites) : undefined;

        if (!tempFavoritesArray) {
            tempFavoritesArray = [];
        }

        if (favoriteExists(id)) {
            const modifiedFavoritesArray = favorites.filter(f => f.id !== id)
            setFavotires(modifiedFavoritesArray)
            localStorage.setItem("userFavorites", JSON.stringify(modifiedFavoritesArray));
        }
        else {
            const newFavorite = { id: id, name: name };
            setFavotires(prevState => ([...prevState, newFavorite]));
            tempFavoritesArray.push(newFavorite)
            localStorage.setItem("userFavorites", JSON.stringify(tempFavoritesArray))

        }
    }


    const favoriteExistsDevs = (id) => {
        return devsFavorites.some(f => f.id === id);
    }


    const handleAddFavoriteDevs = (id, name) => {

        if (favoriteExistsDevs(id)) {
            setDevsFavorites(devsFavorites.filter(f => f.id !== id))
        }
        else {
            const newDevsFavorites = { id: id, name: name };
            setDevsFavorites(prevState => ([...prevState, newDevsFavorites]));
        }

    }

    return (
        <UserContext.Provider value={{ user, favorites, devsFavorites, handleLogin, handleLogout, handleAddFavorite, favoriteExists, handleAddFavoriteDevs, favoriteExistsDevs }}>
            {children}
        </UserContext.Provider>
    )

}


// console.log("Works!");
