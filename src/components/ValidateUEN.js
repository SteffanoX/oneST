import { useState } from 'react'

const ValidateUEN = () => {
  const [uen, setUen] = useState('')
  const [vResults, setVResult] = useState('')
  const [ResultsCol, setResultCol] = useState('black')
  
  const onSubmit = (e) =>{
    e.preventDefault()

    if(uen.length < 9 || uen.length > 10){
        setVResult('Invalid UEN, a UEN should consists 9 - 10 characters')
        setResultCol('red')
    }
    else if(uen.length === 9){
        if(BuissACRA()){
            setVResult('This UEN format is issued to Businesses Registered with ACRA')
            setResultCol('green')

        }else{
            setVResult('This is not a Valid UEN Format')
            setResultCol('red')
        }
    }
    else if(uen.length === 10){
        if (uen.charAt(0).toLowerCase() === 's' || 
            uen.charAt(0).toLowerCase() === 't'){
                if(NewUEN()){
                    setVResult('This the new UEN format issued to all other entities')
                    setResultCol('green')
                }else{
                    setVResult('This is not a Valid UEN Format')
                    setResultCol('red')
                }
            } else{
                if(LocalACRA()){
                    setVResult('This UEN format is issued to Local Companies Registered with ACRA')
                    setResultCol('green')
                }else{
                    setVResult('This is not a Valid UEN Format')
                    setResultCol('red')
                }
            }
    }
    else{
        setVResult('This is not a Valid UEN Format')
        setResultCol('red')
    }

  }

  //Check Case A. Businesses Registered with ACRA
  const BuissACRA = () => {
    for(var i=0; i<(uen.length-1); i++ ){
        if (!Number(uen.charAt(i))) return false;
    }
    if(!/^[a-zA-Z]+$/.test(uen.charAt((uen.length) - 1))) return false;
    return true;
  }

  //Check Case B. Local Company assume the first year of UEN issuance is 1965
  const LocalACRA = () =>{
    const this_year = parseInt(new Date().getFullYear());
    const year = parseInt(uen.slice(0,4))
    if((year > this_year) || (year < 1965) || (!year)) return false

    for(var i=4; i<(uen.length-1); i++){
        if (!Number(uen.charAt(i))) return false;
    }
    if(!/^[a-zA-Z]+$/.test(uen.charAt((uen.length) - 1))) return false;
    return true;
  }

  //Check Case C. All other entities which will be issued new UEN
  const NewUEN = () => {
    const this_year = parseInt(new Date().getFullYear());
    const year = uen.charAt(0).toLowerCase() === 't' ? parseInt('20'+uen.slice(1,3)):parseInt('19'+uen.slice(1,3))
    if((year > this_year) || (year < 1965) || (!year)) return false
    for(var i=3; i<(uen.length-1); i++){
        if (!Number(uen.charAt(i))) return false;
    }
    if(!/^[a-zA-Z]+$/.test(uen.charAt((uen.length) - 1))) return false;
    return true;
  }

  return (
    <>
    <form className="add-form" onSubmit={onSubmit}>
    <div className="form-control">
        <h3>Check UEN</h3>
        <br/>
        <ul>
            <li>A. checks for format 'nnnnnnnnX' n=digit, X = alphabet</li>
            <li>B. checks for format 'yyyynnnnnX' n=digit, X = alphabet, yyyy year between 1965 and current year</li>
            <li>C. checks for format 'TyyPQnnnnX' n=digit, X = alphabet, Tyy or Syy year between 1965 and current year</li>
        </ul>
        <br/>
        <label>UEN Number: </label>
        <input type='text' 
               placeholder='Enter UEN Number'
               value = {uen}
               onChange={(e) => setUen(e.target.value)} />
    </div>
    <input type='submit' 
               value='Validate UEN'
               className="btn btn-block" />
    </form>
    <div className='form-Control'>
        <label>Validation Results:</label><br/>
        <p style={{color:ResultsCol}}>{vResults}</p>
    </div>
    <br/><br/>
    </>
  )
}

export default ValidateUEN