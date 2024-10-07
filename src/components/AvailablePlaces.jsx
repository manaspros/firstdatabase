import {useState , useEffect} from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchAvailablePlaces} from '../http.js';

const places = localStorage.getItem('places');
export default function AvailablePlaces({ onSelectPlace }) {

  const[isFerching, setIsFetching]=useState(false);
  
  const [AvailablePlaces,setAvalablePlaces] = useState([]);
  const [error,setError]=useState();
  
  useEffect(()=> {

    async function fetchPlace() {
      setIsFetching(true);

      try{
        const places = await fetchAvailablePlaces();
        
        navigator.geolocation.getCurrentPosition((postion)=> {
          const sortedPlaces = sortPlacesByDistance(
            places, 
            postion.coords.latitude, 
            postion.coords.longitude
          );
          setAvalablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      }
      catch(error){
        setError({
          message: error.message || ' Coult not fech'
        });
      setIsFetching(false);
      }
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
