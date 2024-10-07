import {useState , useEffect} from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

const places = localStorage.getItem('places');
export default function AvailablePlaces({ onSelectPlace }) {

  const[isFerching, setIsFetching]=useState(false);
  
  const [AvailablePlaces,setAvalablePlaces] = useState([]);
  const [error,setError]=useState();
  
  useEffect(()=> {

    async function fetchPlace() {
      setIsFetching(true);

      try{
        const response = await fetch('http://localhost:3000/placesss');
        const resData = await response.json();


        if (!response.ok){
          throw new Error('Failed to fetch places');
        }
        setAvalablePlaces(resData.places);
      }
      catch(error){
        setError({message: error.message || ' Coult not fech'});
      }

      setIsFetching(false);
    }

    fetchPlace();

  }, []);

  if(error){
    return <Error title="An error occurred!" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={AvailablePlaces}
      isloading={isFerching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
