import 'bootstrap/dist/css/bootstrap.min.css'
import Dasboard from './Dasboard';
import Login from './Login';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Dasboard code={code} /> : <Login />
}

export default App;
