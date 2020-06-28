import React, {useState, useEffect, ChangeEvent} from 'react';
import './styles.css';
import axios from 'axios'; 

interface ViaCepResponse{
    localidade: string;
    uf: string;
    erro: boolean;
}

function SearchCity (){

    const [city, setCity] = useState<string>("");
    const [uf, setUf] = useState<string>("");
    const [zipCode, setZipCode] = useState<number>(0);
    
    function resetState(){
        setCity("")
        setUf("")
    }
    
    useEffect(() => {
        
        if (zipCode < 10000000 || zipCode > 99999999){
            resetState();
            return;
        }
        
        axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${zipCode}/json/`).then(response => {
       
           const {localidade, uf, erro} =  response.data;

           if(erro){
             resetState();
             return;
           }
           setCity(localidade);
           setUf(uf);
          
        })
    }, [zipCode]);


    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
      
        const { value } = (event.target);

        setZipCode(Number(value));
    }


    return (
        <div className="container">
           

            <div>
                <label>Cidade</label>
                    <input 
                        type="text"
                        value={city}
                        placeholder="Cidade"
                        disabled
                    />
                    <label>Estado</label>
                    <input 
                        type="text"
                        placeholder="UF"
                        value={uf}
                        disabled
                    />
            </div>
         

            <div>
                <label>Código postal</label>
                <input 
                    type="number"
                    placeholder="Insira o código postal"
                    name="cep"
                    id="cep"
                    onChange={handleInputChange}
                />
            </div>
            
        </div>
    )
}

export default SearchCity;