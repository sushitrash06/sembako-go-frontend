import React from 'react';
import About from '../../Component/About';
import Banner from '../../Component/Banner';
import Footer from '../../Component/Footer';
import Navbar from '../../Component/NavbarUser';
import ProdukView from './ProdukView';
import Minyak from './RekomendasiProduk';

export default function TampilanAwal(){
    return(
        <div>
            <Navbar/>
            <Banner/>
            <About/>
            <div><h2>Rekomendasi Produk</h2></div>
            <br/>
            <ProdukView/>
            <Minyak/>
            <Footer/>
        </div>
    );
}

