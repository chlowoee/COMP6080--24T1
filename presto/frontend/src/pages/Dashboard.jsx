import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { getStore } from '../Api';

import Navbar from '../components/Navbar';
import PresentationList from '../components/PresentationList';

function Dashboard ({ token, setTokenFunction }) {
  if (token === 'null' || token === null) {
    return <Navigate to='/login' />;
  }
  const [store, setStore] = React.useState(undefined);
  const fetchData = async () => {
    try {
      const store = await getStore(token);
      setStore(store);
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar
        token={token}
        setTokenFunction={setTokenFunction}
        store={store}
        setStore={setStore}
      />
      <Container>
        <PresentationList store={store} setStore={setStore} setTokenFunction={setTokenFunction}/>
      </Container>
    </>
  );
}

export default Dashboard;
