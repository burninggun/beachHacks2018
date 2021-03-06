import React, {Component} from 'react';
import Hackathon from './hackathon'
import axios from 'axios'

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            hackathons: []
        }
    }

    componentWillMount(){
        this.getHackathons()
    }

    getHackathons(){
        axios.get('/hackathons').then(res => {
            console.log( 'hackathon data'  ,res)
            this.setState({
                hackathons: res.data
            })
        })
    }

    render(){



        const hackathonBox = this.state.hackathons.map( (item,index) => {
            console.log(item)

            return(
                <Hackathon key={index} data={item} />
            )
        })

        return(
            
            <div className="jumbotron mt-5" >
                <div  >
                    <h1 className="text-center display-3 mb-5 w-100">Welcome to the Home Page</h1>
                    <h3 className="display-4 text-center w-100"> {this.state.hackathons.length} Hackathons happening now! </h3>
                    {/* <input type="text" className="form-control my-5" placeholder="search for a hackathon"/> */}
                </div>
                    <h4 className="my-5" >Explore Hackathons</h4>
                    <div className="d-flex row justify-content-center" >
                        {hackathonBox}
                    </div>
            </div>
        )
    }
}

export default Home

