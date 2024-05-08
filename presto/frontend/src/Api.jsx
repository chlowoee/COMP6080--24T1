import axios from 'axios';

/**
 * Helper function to get data from database.json
 * @param {*} token
 * @returns
 */
export const getStore = async (token) => {
  try {
    const response = await axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (err) {
    alert(err.response.data.error);
  }
};

/**
 * Helper function that uploads data to database.json
 * @param {*} newStore
 * @param {*} token
 */
export const putStore = async (newStore, token) => {
  try {
    await axios.put('http://localhost:5005/store', newStore, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    alert(err.response.data.error);
  }
};

/**
 * Helper function to log a user in with email and pw
 * @param {*} setTokenFunction
 * @param {*} navigate
 * @param {*} email
 * @param {*} password
 */
export const loginApi = async (setTokenFunction, navigate, email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:5005/admin/auth/login',
      {
        email,
        password
      }
    );
    setTokenFunction(response.data.token);
    localStorage.setItem('token', response.data.token);
    navigate('/dashboard');
  } catch (err) {
    alert(err.response.data.error + '. Please register first.');
  }
};

/**
 * Helper function to register a user. Has password error checking.
 * @param {*} setTokenFunction
 * @param {*} navigate
 * @param {*} email
 * @param {*} name
 * @param {*} password
 * @param {*} confirmPassword
 * @returns
 */
export const registerApi = async (
  setTokenFunction,
  navigate,
  email,
  name,
  password,
  confirmPassword
) => {
  try {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }
    const response = await axios.post(
      'http://localhost:5005/admin/auth/register',
      {
        email,
        password,
        name
      }
    );
    setTokenFunction(response.data.token);
    localStorage.setItem('token', response.data.token);
    navigate('/dashboard');
  } catch (err) {
    alert(err.response.data.error);
  }
};

/**
 * Helper function to logout. Remove token from localstorage,
 * @param {*} navigate
 * @param {*} token
 * @param {*} setToken
 */
export const logoutApi = async (navigate, token, setToken) => {
  try {
    const data = await getStore(token);
    await putStore(data, token);

    await axios.post(
      'http://localhost:5005/admin/auth/logout',
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );
    setToken(null);
    localStorage.removeItem(token);
    navigate('/login');
  } catch (err) {
    alert(err.response.data.error);
  }
};
