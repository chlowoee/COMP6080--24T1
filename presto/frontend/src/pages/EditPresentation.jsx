import React from 'react';
import { useParams } from 'react-router-dom';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import { getStore } from '../Api';

function EditPresentation ({ token, setTokenFunction }) {
  const { id } = useParams();

  const [store, setStore] = React.useState(undefined);

  const fetchData = async () => {
    try {
      const store = await getStore(localStorage.getItem('token'));
      setStore(store);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (store === undefined || Object.keys(store.store).length === 0) {
    return null;
  }
  return (
    <>
      <ResponsiveDrawer id={id} store={store} setStore={setStore} token={token} setTokenFunction={setTokenFunction}/>
    </>
  );
}

export default EditPresentation;
