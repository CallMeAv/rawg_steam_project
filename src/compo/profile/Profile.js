import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider"
import "./profile.scss"

const Profile = () => {
    const { user, favorites, handleLogout, devsFavorites} = useUserContext();


    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <section className="row mt-3">
            <div className="col-md-4">
                <img src="https://picsum.photos/300/300" alt="User Profile Picture" className="img-fluid rounded-circle" />
            </div>
            <div className="col-md-8">
                <div className="d-flex justify-content-between">
                    <h1>
                        USERNAME
                    </h1>
                    <button className="btn btn-outline-danger" style={{ minWidth: 100 }} onClick={handleLogout}> Logout </button>
                </div>
                <hr />
                <p><strong>Email: <br /></strong><span className="text-info">asd@asd.com</span></p>
                <p><strong>Location: <br /></strong><span className="text-info">asd@asd.com</span></p>
                <p><strong>About: <br /></strong><span className="text-info">asd@asd.com</span></p>
                <p><strong>Favorite Food: <br /></strong><span className="text-info">asd@asd.com</span></p>
            </div>
            <div className="col-md-6">
                <h2>
                    Favorite Games
                </h2>
                <hr />
                <ul className="profile-forite-list">
                    {
                        favorites.map(f => (
                            <li key={f.id}>
                                <Link to={`/games/details/${f.id}`}><strong><span className="text-info"> {f.name} </span></strong></Link>
                                <button className="ms-3 btn btn-outline-danger btn-sm">Remove</button>

                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md-6">
                <h2>
                    Game Studios
                </h2>
                <hr />
                <ul className="profile-forite-list">
                    {devsFavorites ? (
                        devsFavorites.map(fdev => (
                            <li key={fdev?.id} >
                                <Link to={`/developers/details/${fdev.id}`}>
                                    <strong><span className="text-info">{fdev.name}</span></strong>
                                </Link>
                                <button className="ms-3 btn btn-outline-danger btn-sm">Remove</button>
                            </li>
                        ))
                    ) : (
                        <li>No favorite developers found</li>
                    )}
                </ul>
                {/* <ul className="profile-forite-list">
                    {
                        devsFavorites.map(fdev => (
                            <li key={fdev?.id}>
                                <Link to={`/developers/details/${fdev.id}`}><strong><span className="text-info"> {fdev.name} </span></strong></Link>
                                <button className="ms-3 btn btn-outline-danger btn-sm">Remove</button>
                            </li>
                        ))
                    }
                </ul> */}
            </div>
        </section>
    )
}

export default Profile;