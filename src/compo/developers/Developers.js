import { Link } from "react-router-dom";
import { useDevs } from "../../providers/DevsProviders";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUserContext } from "../../providers/UserProvider";



const Developers = () => {
    const { devs } = useDevs();
    const { favoriteExistsDevs, handleAddFavoriteDevs } = useUserContext();


    return (
        <section className="row g-2">{
            devs?.results.map(devs => (
                <div className="card mb-1">
                    <div key={devs.id} className="card-body">
                        <img src={devs.image_background} style={{ height: 200, width: "100%", objectFit: "cover" }} className="rounded-2" alt={devs.slug}></img>
                        <h2 className="card-title">{devs.name}</h2>
                        <h4>Creators of:</h4>
                        <p className="card-text">{devs.games.map(g => g.name + ", ")}</p>
                        <Link to={`/developers/details/${devs.id}`} className="btn btn-primary">Read More</Link>
                        <div className="fs-3" style={{ cursor: "pointer" }} onClick={() => handleAddFavoriteDevs(devs?.id, devs?.name)} >
                            {favoriteExistsDevs(devs?.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                            
                        </div>

                    </div>
                </div>))}
        </section >

    )
}


export default Developers