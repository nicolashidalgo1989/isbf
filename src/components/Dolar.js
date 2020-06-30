import React, {Component} from 'react';    
import BarChart from "./BarChart";

class Dolar extends Component{ 

    chartRef = React.createRef();
    initRef = React.createRef();
    endRef = React.createRef();

    apiKey = '9c84db4d447c80c74961a72245371245cb7ac15f';

    state = {

        valores : [],
        status: null

    }   

    calcularMaximo = () => { 

        var max = Math.max.apply(Math, this.state.valores.map( (dato) => { return parseInt(dato.Valor); }));

        return max;

    }

    calcularMinimo = () => { 

        var min = Math.min.apply(Math, this.state.valores.map( (dato) => { return parseInt(dato.Valor); }));

        return min;

    } 

    calcularPromedio = () => {
        
        var total = 0;

        this.state.valores.forEach( (dato) => {
            total += parseInt(dato.Valor);
        });

        var prom = parseInt(total / this.state.valores.length);

        return prom;
    } 

    obtenerValores = () => {
        var valors = [];
        var valors = this.state.valores.map( (dato) => { return parseInt(dato.Valor); }); 
        return valors;
    }

    obtenerFechas = () => {
        var fechas= [];
        var fechas = this.state.valores.map( (dato) => { return parseInt(dato.Fecha); });
        return fechas;
    }

    getValores = (event) => {

        event.preventDefault(); 

        var i = this.initRef.current.value.split('-');
        var e = this.endRef.current.value.split('-');
        
        var url = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/${i[0]}/${i[1]}/dias_i/${i[2]}/${e[0]}/${e[1]}/dias_f/${e[2]}?apikey=${this.apiKey}&formato=json`;
 
        fetch(url)
        .then(res => res.json())
        .then( json => {

            this.setState({
                valores: json.Dolares,
                status: 'success'
            }); 

        });


    } 
 
    render(){   
            

        return(

            <React.Fragment> 

                <div className="container">
 
                    <div className="row">
 
                        <div className="col-sm-6">

                            <h1 className="title animate__fadeIn">Calcula el valor del dólar</h1>

                            <form className="form animate__fadeIn" onSubmit={this.getValores} onChange={this.getValores}>

                                <div>

                                    <div className="form-group"> 
                                        <label htmlFor="inicio">Desde:</label> 
                                        <input type="date" name="inicio" ref={this.initRef}/>
                                    </div>

                                    <div className="form-group">  
                                        <label htmlFor="termino">Hasta:</label>
                                        <input type="date" name="termino" ref={this.endRef} />
                                    </div>

                                </div>

                                <input className="btn" type="submit" value="Promediar" />

                            </form> 

                        </div>

                        <div className="col-sm-6">
                             
                            {this.state.status === 'success' &&
                                <div> 
                                    
                                    <div className="resultados animate__fadeIn"> 
                                        <h2>Valor promedio : <strong>{this.calcularPromedio()} USD</strong></h2>
                                        <h2>Valor mínimo : <strong>{this.calcularMaximo()} USD</strong></h2>
                                        <h2>Valor máximo : <strong>{this.calcularMinimo()} USD</strong></h2>
                                    </div>

                                </div>
            
                            }
 
                        </div>
                    
                    </div>

                    <div className="row">

                        {this.state.status === 'success' &&

                            <BarChart
                            data={this.obtenerValores()}
                            labels={this.obtenerFechas()} />
                        }

                    </div>

                </div>

            </React.Fragment>

        );
        
    }

}

export default Dolar;
