import axios from "axios";

function App({ currentUser }) {
  return <h1>App!</h1>;
}

export async function getServerSideProps({ req, res }) {
  console.log("req.headers: ", req.headers);

  const response = await axios.get(
    "http://localhost:4000/api/users/currentuser",
    {
      headers: req.headers,
    }
  );

  return {
    props: response.data,
  };
}

export default App;
