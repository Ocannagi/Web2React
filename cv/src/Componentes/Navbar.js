import React from 'react';
import { Link } from 'react-router-dom';


class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //this.activateScrollspy();
    }

    // Activate Bootstrap scrollspy on the main nav element
    activateScrollspy() {

        window.addEventListener('DOMContentLoaded', event => {

            // Activate Bootstrap scrollspy on the main nav element
            // const sideNav = document.body.querySelector('#sideNav');
            // if (sideNav) {
            //     new bootstrap.ScrollSpy(document.body, {
            //         target: '#sideNav',
            //         rootMargin: '0px 0px -40%',
            //     });
            // };

            // Collapse responsive navbar when toggler is visible
            const navbarToggler = document.body.querySelector('.navbar-toggler');
            const responsiveNavItems = [].slice.call(
                document.querySelectorAll('#navbarResponsive .nav-link')
            );
            responsiveNavItems.map(function (responsiveNavItem) {
                responsiveNavItem.addEventListener('click', () => {
                    if (window.getComputedStyle(navbarToggler).display !== 'none') {
                        navbarToggler.click();
                    }
                });
            });

        });
    }




    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                <a class="navbar-brand js-scroll-trigger" href="#page-top">
                    <span class="d-block d-lg-none">Nico Gomez Ivaldi</span>
                    <span class="d-none d-lg-block"><img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="C:\Users\Presentacion\Desktop\Nico\Web2React\cv\src\Imagenes\profile.jpg" alt="..." /></span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <Link className="nav-link js-scroll-trigger" to="acercaDe">Acerca de</Link>
                        </li>
                        {/* <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#experience">Experience</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#education">Education</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#skills">Skills</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#interests">Interests</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#awards">Awards</a></li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;