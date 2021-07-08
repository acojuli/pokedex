import './style.css'

const Navbar = () => {
    let imgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"

    return(
        <nav>
            <div/>
            <img src={imgUrl} alt="pokeapi-logo" className="navbar-image"/>
            <div>♥️</div>
        </nav>
    )
}

export default Navbar;