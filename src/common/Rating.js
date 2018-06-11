import React,{Component} from 'react';
import './rating.scss'
class Rating extends Component{
    render(){
        let arr = [];
        let length = this.props.length;
        if(length===5){
            for(let i = 0; i < 5; i++){
                arr.push(<i className="fa fa-star moreStars" ></i>)
                }
        }else{
        for(let i = 0; i < length; i++){
            arr.push(<i className="fa fa-star moreStars" ></i>)
            }
        for(let i = 0; i < 5-length; i++){
                arr.push(<i className="fa fa-star moreWhiteStars" ></i>)
                }
        }
         return arr
    }
}
    


export default Rating;