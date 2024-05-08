import React from 'react';
import { getStore } from '../Api';
import SlideshowPreview from '../components/SlideshowPreview';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * Preview presentation page
 * @param {*} token
 * @param {*} setTokenFunction
 */
function Preview ({ token, setTokenFunction }) {
  const [presentationData, setPresentationData] = React.useState(null);
  const { id } = useParams();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStore(token);
        setPresentationData(data.store[id]);
      } catch (error) {
        console.error('Error fetching presentation data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
     <Navbar token={token} setTokenFunction={setTokenFunction}/>
      <div>
        {presentationData && <SlideshowPreview pres={presentationData} />}
      </div>
    </>
  );
}

export default Preview;
