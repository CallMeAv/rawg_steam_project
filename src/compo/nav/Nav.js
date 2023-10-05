import { Link, useNavigate } from "react-router-dom";
import { useDarkmodeContext } from "../../providers/DarkmodeProvider";
import { useState } from "react";
import { useUserContext } from "../../providers/UserProvider";

const Nav = () => {
    const { isDarkmode, handleToggleDarkmode } = useDarkmodeContext();
    const { user } = useUserContext();
    const [query, setQuery] = useState();
    const navigate = useNavigate();

    const handleFormChange = (event) => {
        const value = event.target.value;
        setQuery(value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate(`/?query=${query}`)
    }



    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Developers">Developers</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Action</Link></li>
                                <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><span className="dropdown-item" onClick={handleToggleDarkmode} >Change Theme to: {isDarkmode ? "Light" : "Dark"}</span></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onChange={handleFormChange} onSubmit={handleFormSubmit}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    {
                        user === undefined ?
                            <div className="ps-3">
                                <Link className="btn btn-outline-primary" to="/login">Login</Link>
                            </div>
                            :
                            <div className="ps-3">
                                <Link className="btn btn-outline-primary" to="/profile">{user.username}</Link>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Nav