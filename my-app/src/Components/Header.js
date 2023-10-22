import { Link} from 'react-router-dom';
const Header = () => {

  
    return (
        <nav class="navbar navbar-expand-lg  px-0 py-3" style={{backgroundColor: 'lime'}}>
            <div class="container-xl">
                <div class="collapse navbar-collapse " id='navbarCollapse' >
                    <div class="navbar-nav mx-lg-auto text-dark">
                        <Link class="nav-item nav-link active" to="/dashbord" aria-current="page">Dashboard</Link>

                        <Link class="nav-item nav-link active" to="/comment">Comment</Link>
                        <Link class="nav-item nav-link active" to="/question">Question</Link>
                      
                    </div>           
                </div>
            </div>
        </nav>
    );
    }


export default Header;
