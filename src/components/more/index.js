import React,{Component} from 'react';
import FetchJsonp from "fetch-jsonp";
import './more.scss';
import Rating from '../../common/Rating';
class More extends Component{
    constructor(props){
        super(props);
        this.state={
            nowtype:'book_fiction',
            list:[]
        }
    }
    componentWillMount(){
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
    goDetail(type,id){
        // console.log(type,id);
        this.props.history.push("/detail/"+type+"/"+id);
    }
    getData(type){
        FetchJsonp('https://m.douban.com/rexxar/api/v2/subject_collection/'+type+'/items?os=ios&start=0&count=15&loc_id=0').then(function(response) {
           return response.json();
          }).then((res)=>{
              console.log(res);
                this.setState({
                    list:res.subject_collection_items,
                    nowtype:type,
                })
                console.log(this.state.list);
          });
}
    render(){
            return (<div className="detailContainer moreContainer">
            {this.state.nowtype==='book_fiction'?<h2>最受关注图书|虚构类</h2>:<h2>最受关注图书|非虚构类</h2>}
            {
                this.state.list.map((item)=>{
                        return <div key={item.id} className="detailbox moreBox" onClick={this.goDetail.bind(this,this.state.nowtype,item.id)}>
                            <h3>{item.title}&nbsp;&nbsp;
                            {item.actions.length!==0?<span className='moreSpan'>{item.actions}</span>:''}
                            </h3>
                            <div className="detaildesc">
                                <div className="detailleft">
                                    <p>评分：{item.rating.value}星星：{Math.floor(item.rating.value/item.rating.max/2*10)}</p>
                                    <Rating  length={Math.floor(item.rating.value/item.rating.max/2*10)}></Rating>
                                    <p>{item.author}/{item.press}/{item.price}/{item.year}</p>
                                </div>
                                <div className="detailright">
                                    <img src={item.cover.url} alt="pictures"/>
                                </div>
                            </div>
                        </div>
                })
            }
        </div>)  
    }
}

export default More;