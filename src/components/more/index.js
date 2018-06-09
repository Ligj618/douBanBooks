import React,{Component} from 'react';
import FetchJsonp from "fetch-jsonp";
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
            return (<div className="detailContainer">
            {this.state.nowtype==='book_fiction'?<h2>最受关注图书|虚构类</h2>:<h2>最受关注图书|非虚构类</h2>}
            {
                this.state.list.map((item)=>{
                        return <div key={item.id} className="detailbox" onClick={this.goDetail.bind(this,this.state.nowtype,item.id)}>
                            <h3>评分：{item.title}&nbsp;&nbsp;评论数：{item.id}</h3>
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
                })
            }
        </div>)  
    }
}

export default More;