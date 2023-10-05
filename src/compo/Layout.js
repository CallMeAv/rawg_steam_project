import { DarkmodeProvider } from "../providers/DarkmodeProvider"
import Nav from "./nav/Nav"


const Layout = ({ children }) => {
    return (
        <>
            <DarkmodeProvider>
                <Nav />
            </DarkmodeProvider>
            <main className="container">
                {children}
            </main>
        </>
    )
}

export default Layout