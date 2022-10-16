import React,{useEffect,useState} from 'react'
import { Box,Grid } from '@mui/material'
import Navbar from './Navbar'
import Filter from './Filter'
import Loading from '../utils/Loading'
import Videogrid from './Videogrid'
import axios from 'axios';
import { config } from '../App'
// import { set } from 'date-fns'

// const URL = 'https://a7953e3a-de43-42ed-94cd-005093523cc9.mock.pstmn.io/'

//example of shorting;
//.....<URL>......../v1/videos?genres=Education,Sports&contentRating=12
//contentRating=3%2B

const LandingPage = ({videoDetails}) => {
  const [videos, setVideos] = useState([]);
  const [loading,setLoading] = useState(false);
  const [arrGenere,setGenere] = useState([]);
  const [age,setAge] = useState(null);
  const [params,setParams] = useState("");
  const [sort,setSort] = useState("")

  // const [genere,setGenere] = useState("generes=")
  useEffect(() => {
    getApi();  
  },[])
  // eslint-disable-next-line
  useEffect(()=>{
    // eslint-disable-next-line
    apifiltercall();
    // eslint-disable-next-line
    thefinalcall();
    // eslint-disable-next-line
  },[arrGenere,age,sort])
  
  const getApi= async()=>{
    setLoading(true);
    await axios.get(config.endpoint).then(res=>{
      setLoading(false);
      setVideos(res.data.videos)
    }).catch(e=>{
      setLoading(false);
      console.log(e)
    })
    setLoading(false);
  }

 

  const func1 = async(e) => {
    const recievedData = e.target.value;
    if("Lifestyle"===recievedData||"All-Genere-Btn"===recievedData){
      setGenere([]);
    }else{
      setGenere(previousArr=>[...previousArr,recievedData]);
    }   
  }
  const func2 = async(e) => {
    let response = e.target.value
    if("Anyone"===response){
      setAge(null);
     //apifiltercal()
    }else{
      setAge(response);
      //apifiltercall()
    }
  }
  //searchbar
  // const onChangeHandeler = (e) =>{
  //   const text = e.target.value;
  //   const find = videos.filter(videos=>)
  // }

  const debounceSearch = (e) => {
    setLoading(true);
    setTimeout(async()=>{
      await axios.get(config.endpoint + "?title="+ e.target.value).then(res=>{
        setLoading(false);
        setVideos(res.data.videos);
      }).catch(e=>{
        setLoading(false);
        console.log(e);
      })
      setLoading(false);
    },500)
    setLoading(false);
  };
  



  const handleSortBy = (e) =>{
    setSort(e.target.value);
  }





  const apifiltercall = async() =>{

    if(arrGenere.length!==0&&age===null&&sort===""){
      const newarr = arrGenere.join(",");
      console.log(newarr);
      setParams("?genres="+newarr);
    }
    if(arrGenere.length===0&&sort===''&&age){
      setParams("?contentRating="+age+'%2B');
    }
    if(arrGenere.length===0&&!age&&sort.length!==0){
      setParams('?sortBy='+sort)
    }
    if(arrGenere.length!==0&&age&&sort===''){
      const newarr = arrGenere.join(",");
      setParams("?genres="+newarr+"&contentRating="+age+'%2B')
    }
    if(arrGenere.length===0&&age&&sort.length!==0){
      setParams(`?contentRating=${age}%2B&sortBy=${sort}`)
    }
    if(arrGenere.length!==0&&!age&&sort.length!==0){
      const newarr = arrGenere.join(",");
      setParams("?genres="+newarr+'&sortBy='+sort)
    }
    if(arrGenere.length!==0&&age&&sort.length!==0){
      const newarr = arrGenere.join(",");
      setParams("?generes="+newarr+"&sortBy="+sort+"&contentRating"+age+"%2B");
    }
  }
  const thefinalcall = async() =>{
    setLoading(true);
    await axios.get(config.endpoint+params).then(res=>{
      setLoading(false);
      setVideos(res.data.videos)
    }).catch(e=>{
      setLoading(false);
      console.log(e)
    })
    setLoading(false);
  }
  console.log(params);
  
  //the search call will happen in the current downloaded data from the base URL.
  
  
  return (
    <Box>{!videoDetails&&<><Navbar funcChange={debounceSearch}/>
    <Filter funcChange={debounceSearch} func1={func1} func2={func2} handleSortBy={handleSortBy}/>
    </>}          
        <Box sx={{width:"full",height:"auto"}}>
          {loading?(<Loading />):(<>
            <Box sx={{ padding: "3rem 5rem" }}>
            <Grid container spacing={2}>
              {videos.map((video) => (
                <Grid key={video._id} item xs={12} sm={6} md={3}>
                  <Videogrid video={video} sortBy={sort} />
                </Grid>
              ))}
            </Grid>
          </Box>
          </>)}
        </Box>
    </Box>
  )
}

export default LandingPage