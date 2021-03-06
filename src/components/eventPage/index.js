import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import hero from '../../assets/images/sitetop-cover.jpg'
import {connect} from 'react-redux'

class EventPage extends Component{
    constructor(props){
        super(props);
        this.state={
            numAttendees:99,
            hackData:{
                title:'',
                userData:{}
            }
        }
    }


    getProfileData(){
        axios.get('/auth/data').then(res=>{
            console.log(res)
            const user = res
            this.setState({
                userData: res
            })
        })
    }

    componentWillMount(){
        this.getHackathonInfo()
    }
    componentDidMount(){
        this.getProfileData()

    }
    getHackathonInfo(){
        axios.get(`/hackathons/${this.props.match.params.eventId}`).then(res => {
            console.log(res)
            this.setState({
            hackData: res.data[0]
        })
    })
    }
    authRender(element){
        if (this.props.auth){

        }
    }
    onJoinClick(){
        axios.post(`/hackathons/${this.props.match.params.eventId}/join`, this.state.hackData).then(res=>{
            console.log(res)
        })
    }
    render(){
        const dummyImg={
            height:'300px',
            width: '100vw',
            backgroundColor: 'lightGray',
            overflow:'hidden'
        }
        const desc = {
            height: '500px',
            overflow:'auto'
        }
        
        const attendee={
            height:'4vw',
            width:'4vw',
            display:'inline-block',
            backgroundColor:'lightGray',
            margin: '3px'
        }
        const attendeeArray=[]
        for( let i =0; i<this.state.numAttendees; i++){
            if(i>16) continue
            attendeeArray.push(null);

        }
        const attendeeSquare = attendeeArray.map( (item,index)=>{
            if(index===16){
                return(
                    <span key={index}> {this.state.numAttendees - attendeeArray.length} more </span>

                )
            }
            return(
                <div key={index} style={attendee}></div>
            )
        } )
        const imgStyle={
            height:'100%'
        }
        console.log(this.state)
        return(
            <div className="row w-100 mb-5 jumbotron mt-3">
                <div style={dummyImg} className="text-center mt-5" >
                    <img src={hero} className="img-fluid" />
                </div>
                <div className="row w-100">
                    <h1 className="text-center w-100 my-3 " >{this.state.hackData.title}</h1>
                </div>
                <div className="row">
                    <div className="col-4">
                        
                        <div>
                            <Link to={`/event/${this.props.match.params.eventId}/register`} >
                                <p className="text-center" >
                                    <button className="btn btn-info w-100 ">Register</button>
                                </p>
                            </Link>
                            <h3 className="text-center" >Attendees</h3>
                            {attendeeSquare}
                            <button onClick={this.onJoinClick.bind(this)} className="btn btn-primary">Join now!</button>
                        </div>
                    </div>
                    <div className="col">
                        <p><span className="font-weight-bold">Start:</span> {this.state.hackData.dateStart}</p>
                        <p><span className="font-weight-bold">End:</span> {this.state.hackData.dateEnd}</p>

                        <div  style={desc} >
                            <h3 className="text-center" >Description</h3>
                            <p>{this.state.hackData.description}</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateWithProps(state){
    auth: state.user.auth
}

export default  connect(mapStateWithProps)(EventPage);