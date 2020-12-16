import React from 'react';
import About from '../../Component/About';
import Banner from '../../Component/Banner';
import Footer from '../../Component/Footer';
import Navbar from '../../Component/NavbarUser';
import Cari from '../Component/CariTampilan';

export default function TampilanAwal(){
    return(
        <div>
            <Navbar/>
            <Banner/>
            <About/>
            <Cari/>
            <Footer/>
        </div>
    );
}

