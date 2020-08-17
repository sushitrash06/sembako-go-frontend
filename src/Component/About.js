import React from 'react';
import gambar1 from '../img/gambardepan.jpg';

class About extends React.Component{
render(){
    const style1 ={
        display: 'block',
        margin: 'auto',
        width: "70%",
    };

    return(
        <div id = "About-style">
            <h1>About Sembako Go!</h1>
            <img
            className = "Gambar1"
            style={style1}
            src ={gambar1}
            alt ="gambar"
            >
            </img>
            <p>“Sembako Go!” merupakan sebuah wadah  jual beli khusus sembako berbasis web yang target penggunanya adalah pedagang sembako besar untuk menjual sembakonya , pedagang sembako kecil untuk membeli pasokan barang jualan di warung mereka dan masyarakat yang tidak memiliki banyak waktu untuk berbelanja.</p>
        </div>
    );
}

}
export default About;