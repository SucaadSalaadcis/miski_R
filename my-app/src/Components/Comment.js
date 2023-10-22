import { useEffect,useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
function Comment() {

    const [questionID, setquestionID] = useState("")
    const [userID, setuserID] = useState("")
    const [comment, setcomment] = useState("")
    const [EditID,setEditID] = useState("")
    const [isEdit,setisEdit] = useState(false)
    const [updateTime, setUpdateTime] = useState(new Date());
    const [apiData, setapiData] = useState([])

    let endpoint = "http://localhost:4000/comment"
    useEffect(() => {
        async function onload() {
            let { data } = await axios.get(endpoint)
            setapiData(data)
        }
        onload()
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let obj = {
                questionID:questionID,
                userID: userID, 
                comment: comment, 
            }
            if(isEdit){

                let UpdateEndPoint =`${endpoint}/${EditID}`
                  const {data} = await axios.put(UpdateEndPoint,obj)
                  console.log(data)
                  if(data.status=="Updated"){
                      const upadateDate = apiData.filter((data)=> data._id!=EditID)
                      setapiData([...upadateDate,data.info])
                      toast.success(data.message)
                  }else{
                      toast.error(data.message)
                  }

                 }else{
            let { data } = await axios.post(endpoint,obj)
            // console.log(data)
            if(data.status=="sucess"){
                toast.success(data.message)
                setapiData([...apiData,data.info])
                setquestionID("")
                setuserID("")
                setcomment("")
            }else{
                toast.error(data.message)
            }
        }
        }catch (error) {
            toast.error(error.message)
        }

    };

    const handleEdit = (data)=>{
        setquestionID(data.questionID)
        setuserID(data.userID)
        setcomment(data.comment)

        setEditID(data._id)
        setisEdit(true)
        console.log(data)
    }

     

    
  const commentDel = async (delId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(`${endpoint}/${delId}`);
        console.log(data)
        setUpdateTime(new Date());
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };



    return (
        <div className="container  border mx-auto p-3 mt-4" style={{ width: 2000 }}>
            <form onSubmit={handleSubmit}>
            <div className="alert alert-success">Comment</div>
                <div className="row mt-4">

                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputPassword">QuestionID</label>
                            <input type="text" class="form-control" id="exampleInputPassword" placeholder="Enter Question ID" value={questionID}
                                onChange={(event) => setquestionID(event.target.value)}

                            />
                        </div>
                    </div>
                    <div className="col-3">
                    <div class="form-group">
                            <label for="exampleInputPassword">UserID</label>
                            <input type="text" class="form-control" id="exampleInputPassword" placeholder="Enter User ID" value={userID}
                                onChange={(event) => setuserID(event.target.value)}
                            />
                        </div>
                    </div>
                 
                    <div className="col-3">
                    <div class="form-group">
                            <label for="exampleInputEmail">Comment</label>
                            <textarea type="text" class="form-control" name="Full Name" placeholder="Commnet here..." value={comment}
                            style={{width: 300 , height: 140}}
                                onChange={(event) => {
                                    setcomment(event.target.value)
                                }}
                            />
                        </div>
                    </div>
                   
                    
                    <div className="col-3 mt-4">
                        <div class="form-group">
                            <button type="submit" class="btn form-control" style={{backgroundColor: "lime",width:200, marginLeft: 40}}>Submit</button>
                        </div>
                    </div>

                </div>

            </form>
            <div>
            <ToastContainer/>
            <div className="container mt-3">
        <div className="alert alert-success">List of Questions and Comment</div>
        </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">questionID</th>
                            <th scope="col">userID</th>
                            <th scope="col">comment</th>
                        </tr>
                    </thead>
                    {apiData.map(data => {
                        return (<tr>
                            <th scope="row">{data.questionID}</th>
                            <td>{data.userID}</td>
                            <td>{data.comment}</td>
                            <td>{(
                                <div>
                                    <button onClick={()=> handleEdit(data)} className="btn" style={{backgroundColor: "lime"}}>edit</button>
                                </div>
                            )}</td>
                              <td>
                        <button className="btn" onClick={() => commentDel(data._id)}   style={{backgroundColor: "lime"}}> delete</button>
                        </td>
                        </tr>
                       
                        )
                    })}

                    <tbody>
                    </tbody>

                </table>
            </div>
        </div>



    );
}

export default Comment;