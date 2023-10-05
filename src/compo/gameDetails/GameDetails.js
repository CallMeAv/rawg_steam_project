import { useParams } from "react-router-dom"
import { useGameContext } from "../../providers/GamesProvider";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUserContext } from "../../providers/UserProvider";
import { handleAddFavorite, favoriteExists } from "../../providers/UserProvider"

const GameDetails = () => {
    const { gameId } = useParams();
    const { findById, findAchievementsById } = useGameContext();
    const { handleAddFavorite, favoriteExists } = useUserContext();
    const [game, setGame] = useState();
    const [gamePictures, setGamePictures] = useState();
    const [achievements, setAchievements] = useState();


    useEffect(() => {
        const fetchData = async () => {
            setGame(await findById(gameId));
            setAchievements(await findAchievementsById(gameId))
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="row mt-4">
                <div className="col-md-6">
                    <img src={game?.background_image} alt="Product Image" className="img-fluid rounded-3" />
                </div>
                <div className="col-md-6">
                    <h1>{game?.name}</h1>
                    <p>Metacritic Score: <span className="text-info">{game?.metacritic}</span></p>
                    <div className="fs-3" style={{ cursor: "pointer" }} onClick={() => handleAddFavorite(game?.id, game?.name)}>
                        {favoriteExists(game?.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: `<strong>Description:</strong>${game?.description}` }} className="col-md-12">
                    </div>
                </div>
                {/* <section className="col-md-12">
                    <img>{gamePictures?.image}</img>
                </section> */}
                <div className="row mt-4">
                    <div className="col">
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Percent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {achievements?.results.map(ach => (
                                    <tr className="text-center">
                                        <td className="pt-3">{ach.name}</td>
                                        <td className="pt-3">{ach.description}</td>
                                        <td><img src={ach.image} className="img-fluid" style={{ width: 250 }} /></td>
                                        <td className="pt-3">{ach.percent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}
export default GameDetails; 