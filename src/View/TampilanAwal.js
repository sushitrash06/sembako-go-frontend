import React from 'react';
import About from '../Component/About';
import Banner from '../Component/Banner';
import Footer from '../Component/Footer';
import NavbarAwal from '../Component/NavbarAwal';
import Cari from '../Component/CariTampilan';

export default function TampilanAwal(){
    return(
        <div>
            <NavbarAwal/>
            <Banner/>
            <About/>
            <Cari/>
            <Footer/>
        </div>
    );
}

