import 'bootstrap/dist/css/bootstrap.css'
import Header from './Components/Header'
import Comment from './Components/Comment'
import Question from './Components/Question'
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
       <Header></Header>
       <Routes>
      <Route path='/dashbord' element={<h1>Here Is A Dashboard</h1>}></Route>
      <Route path='/comment' element={<Comment></Comment>}></Route>
     <Route path='/question' element={<Question></Question>}></Route>
    
    </Routes>

    
    </>
  );
}

export default App;
