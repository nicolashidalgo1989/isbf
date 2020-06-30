import React, {Component} from 'react';    
import BarChart from "./BarChart";
import Global from '../Global';

class Dolar extends Component{ 

    //Constantes globales
    api = Global.api;
    apiKey = Global.apiKey;

    //Inputs References
    chartRef = React.createRef();
    initRef = React.createRef();
    endRef = React.createRef();

    //Estado Inicial
    state = {

        valores : [],
        status: null

    }   

    //Calcula el máximo valor del dolar desde la api de acuerdo a los rangos de fechas seleccionados por el usuario
    calcularMaximo = () => { 

        let max = Math.max.apply(Math, this.state.valores.map( (dato) => { return parseInt(dato.Valor); }));

        return max;

    }

    //Calcula el mínimo valor del dolar desde la api de acuerdo a los rangos de fechas seleccionados por el usuario
    calcularMinimo = () => { 

        let min = Math.min.apply(Math, this.state.valores.map( (dato) => { return parseInt(dato.Valor); }));

        return min;

    } 

    //Calcula el promedio de los valores del dolar desde la api de acuerdo a los rangos de fechas seleccionados por el usuario
    calcularPromedio = () => {
        
        let total = 0;

        this.state.valores.forEach( (dato) => {
            total += parseInt(dato.Valor);
        });

        let prom = parseInt(total / this.state.valores.length);

        return prom;
    } 

    //Valores del dolar obtenidos desde la api de acuerdo a los rangos de fechas seleccionados por el usuario
    obtenerValores = () => {
        let valors = [];
        valors = this.state.valores.map( (dato) => { return parseInt(dato.Valor); }); 
        return valors;
    }
    
    //Fechas obtenidas desde la api seleccionadas por el usuario
    obtenerFechas = () => {
        let fechas= [];
        fechas = this.state.valores.map( (dato) => { return parseInt(dato.Fecha); });
        return fechas;
    }

    //Consulta a la api con fechas variables
    getValores = (event) => {

        event.preventDefault(); 

        let i = this.initRef.current.value.split('-');
        let e = this.endRef.current.value.split('-');
        
        let url = `${this.api}${i[0]}/${i[1]}/dias_i/${i[2]}/${e[0]}/${e[1]}/dias_f/${e[2]}?apikey=${this.apiKey}&formato=json`;
 
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
                                    
                                    <div className="resultados"> 
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
