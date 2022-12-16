import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Roles from './pages/Roles';
import Supports from './pages/Supports';
import Edit from './edit/Edit'
import EditSupport from './edit/EditSupport';
import Etablissement from './pages/Etablissement';
import EditEtablissement from './edit/EditEtablissement';
import TypeHabilitation from './pages/TypeHabilitation';
import EditTypeHabilitation from './edit/EditTypeHabilitation';
import Personnel from './pages/Personnel';
import EditPersonnel from './edit/EditPersonnel';
import Habilitation from './pages/Habilitation';
//import Sidebar from './layout/Sidebar';
//import Navbar from './layout/Navbar';
import RapportFin from './pages/RapportFin';
import FormBar from './layout/FormBar';

function App() {
  return (
    <Router>
      {/* <Sidebar /> */}
      <FormBar />
        {/* <Navbar /> */}
      <div className='container'>
        <div className='row'>
          <div className='col-sm-2'>
          </div>
          <div className='col-sm-10'>
            <Routes>
              <Route exact path="/role" element={<Roles />} />
              <Route exact path="/support" element={<Supports />} />
              <Route exact path="/etablissement" element={<Etablissement />} />
              <Route exact path="/typehabilitation" element={<TypeHabilitation />} />
              <Route exact path="/personnel" element={<Personnel />} />
              <Route exact path="/habilitation" element={<Habilitation />} />
              <Route exact path="/rapportFin" element={<RapportFin />} />
              {/* For edit */}
              <Route exact path="/role/updateRole/:roleId" element={<Edit />} />
              <Route exact path='/support/updateSupport/:supportId' element={<EditSupport />} />
              <Route exact path='/etablissement/updateEtablissement/:etabId' element={<EditEtablissement />} />
              <Route exact path='/typehabilitation/updateTypeHabilitation/:typeHabId' element={<EditTypeHabilitation />} />
              <Route exact path='/personnel/updatePersonnel/:persId' element={<EditPersonnel />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
