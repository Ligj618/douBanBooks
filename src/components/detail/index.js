import React,{Component} from 'react';
import FetchJsonp from "fetch-jsonp";
import './detail.scss';
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            nowtype:'book_fiction',
            nowid:'',
            list:[]
        }
    }
    componentDidMount(){
        // let{type,id}=this.props.match.params;
        // console.log(type,id);
        this.getData(this.state.nowtype,this.state.nowid)
    }
    componentDidUpdate(){
        // console.log(this.props.match);
        let{type,id}=this.props.match.params;
        console.log(type,id);
        console.log(this.state.nowtype,this.state.nowid);
        if(this.state.nowtype !== type || this.state.nowid !== id){
            this.getData(type,id)
        }
        
    }
    
    getData(type,id){
        FetchJsonp('https://m.douban.com/rexxar/api/v2/subject_collection/'+type+'/items?os=ios&start=0&count=8&loc_id=0').then(function(response) {
           return response.json();
          }).then((res)=>{
              console.log(res);
                this.setState({
                    list:res.subject_collection_items,
                    nowid:id,
                    nowtype:type,
                })
                console.log(this.state.list);
          });
}
    render(){
        return (<div className="detailContainer">
            {
                this.state.list.map((item)=>{
                    if(this.state.nowid === item.id){
                        return <div key={item.id} className="detailbox">
                            <h3>{item.title}{item.id}</h3>
                            <div className="detaildesc">
                                <div className="detailleft">
                                    <p>{item.rating.value}<span>{item.rating.count}</span></p>
                                    <p>{item.author}/{item.press}/{item.price}/{item.year}</p>
                                </div>
                                <div className="detailright">
                                    <img src={item.cover.url} alt="pictures"/>
                                </div>
                            </div>
                        </div>
                    }
                    
                })
            }
        </div>)
    }
}

export default Detail;