import React from 'react';
import gambar1 from '../img/gambardepan.jpg';

class About extends React.Component{
render(){
    const style1 ={
        margin: 'auto',
        width: "30%",
    };

    return(
    <div>
        <div id = "About-style">
            <h1 style={{textAlign:'center'}}>About Sembako Go!</h1>
            <br/>
                <br/>
            <div>
            <img
            className = "Gambar1"
            style={{ width:"50%",marginLeft:"auto", marginRight:"auto" ,display:"block"}}
            src ={gambar1}
            alt ="gambar"
            align="center"
            >
            </img>
            <br/>
            </div>
            <p style={{textAlign:'center',fontSize:"25px"}}> “Sembako Go!” merupakan sebuah wadah  jual beli khusus sembako berbasis web yang target penggunanya adalah pedagang sembako besar untuk menjual sembakonya , pedagang sembako kecil untuk membeli pasokan barang jualan di warung mereka dan masyarakat yang tidak memiliki banyak waktu untuk berbelanja.</p>
        </div>
        <br/>
        <br/>
        <br/>
    </div>

    );
}

}
export default About;