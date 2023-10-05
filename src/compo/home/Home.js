import { Link } from "react-router-dom";
import { useGameContext } from "../../providers/GamesProvider"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { handleAddFavorite, favoriteExists } from "../../providers/UserProvider"
import { useUserContext } from "../../providers/UserProvider";




const Home = () => {
    const { handleAddFavorite, favoriteExists } = useUserContext();

    const { games } = useGameContext();

    return (
        <section className="row g-3">{
            games?.results.map(game => (
                <div className="card col-md-4 mb-2">
                    <div key={game.id} className="card-body m-3">
                        <img src={game.background_image} style={{ height: 300, width: "100%", objectFit: "cover" }} alt={game.slug} className="rounded-2"></img>
                        <h2 className="card-title" style={{ height: 80 }}>{game.name}</h2>
                        <Link to={`/games/details/${game.id}`} className="btn btn-primary">Read More</Link>
                        <div className="fs-3 " style={{ cursor: "pointer" }} onClick={() => handleAddFavorite(game?.id, game?.name)}>
                            {favoriteExists(game?.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                        </div>
                    </div>
                </div>))}
        </section >
    )
}

export default Home

