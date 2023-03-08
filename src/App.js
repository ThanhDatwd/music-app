import AppMuic from "./component";
import SongProvider from "./component/context/SongProvider";
import UserProvider from "./component/context/UserProvider";
import StatusProvider from "./component/context/StatusProvider";
import { ToastContainer } from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux'
import { changeMsg } from "./redux/postSlice";




function App() {
  // const msg = useSelector(state=>state.posts.msg)
  // const dispatch =useDispatch
  // const handleChangeMsg=()=>{
  //   dispatch(changeMsg())
  // }
  return (
    <UserProvider>
      <SongProvider>
        <StatusProvider>
           <AppMuic />
           <ToastContainer 
             position="bottom-left"
             autoClose={1000}
             hideProgressBar
             closeOnClick
           />
        </StatusProvider>
      </SongProvider>
    </UserProvider>
 

    
  );
}

export default App;
