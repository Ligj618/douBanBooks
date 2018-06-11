import React,{Component} from 'react';
import FetchJsonp from "fetch-jsonp";
import Rating from '../../common/Rating'
import './books.scss';
class Books extends Component{
    constructor(props){
        super(props);
        this.state={
            fictionList:[],
            unfictionList:[],
            libraireList:[],
            fictionType:'book_fiction',
            unfictionType:'book_nonfiction',
            libraireType:'market_product_book_mobile_web',
            a:'',
            obj:{}
        };
    }
    goDetail(type,id){
        // console.log(type,id);
        this.props.history.push("/detail/"+type+"/"+id);
    }
    goMore(type){
        console.log(type);
        this.props.history.push("/more/"+type);
    }
    componentDidMount(){
        this.getDate();
    }
    getDate(){
        // 最受欢迎图书1，虚构类 url：https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=0&_=1528422125363
        // * 最受欢迎图书1，非虚构类 url:https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items?os=ios&start=0&count=8&loc_id=0&_=1528422125364
        // * 豆瓣书店下侧列表1 url：https://m.douban.com/rexxar/api/v2/subject_collection/market_product_book_mobile_web/items?os=ios&callback=jsonp3&start=0&count=8&loc_id=0&_=1528422125364
        FetchJsonp('https://m.douban.com/rexxar/api/v2/subject_collection/'+this.state.fictionType+'/items?os=ios&start=0&count=8&loc_id=0').then(function(response) {
            // console.log(response);
           return response.json();
          }).then((res)=>{
            //   console.log(res);
              this.setState({
                  fictionList:res.subject_collection_items
              })
            //   console.log(this.state.fictionList );
          });
          FetchJsonp('https://m.douban.com/rexxar/api/v2/subject_collection/'+this.state.unfictionType+'/items?os=ios&start=0&count=8&loc_id=0').then(function(response) {
            // console.log(response);
           return response.json();
          }).then((res)=>{
            //   console.log(res);
              this.setState({
                  unfictionList:res.subject_collection_items
              })
            //   console.log(this.state.unfictionList );
          });
          FetchJsonp('https://m.douban.com/rexxar/api/v2/subject_collection/'+this.state.libraireType+'/items?os=ios&start=0&count=8&loc_id=0').then(function(response) {
            // console.log(response);
           return response.json();
          }).then((res)=>{
            //   console.log(res);
              this.setState({
                  libraireList:res.subject_collection_items,
                  a:res.subject_collection_items[0].cover.url,
                  obj:res.subject_collection_items[0]
              })
            //   console.log(this.state.libraireList );
            //   console.log(this.state.libraireList[0] );
            //   console.log(Object.keys(this.state.libraireList[0]));
            //   console.log(this.state.obj);
          })
    }
    render(){
        return (<div className="container">
            <div className="fictionBooks">
                <div className="top">
                    <h3>最受关注图书|虚构类</h3>
                    <a onClick={this.goMore.bind(this,this.state.fictionType)}>更多>></a>
                </div>
                <ul>
                    {
                        this.state.fictionList.map((item)=>{
                            return (<li key={item.id}>
                                <a onClick={this.goDetail.bind(this,this.state.fictionType,item.id)}>
                                    <div className="img"><img src={item.cover.url} alt="books"/></div>
                                    <span className="title">{item.title}</span>
                                    <div className="evaluate"><Rating  length={Math.floor(item.rating.value/item.rating.max/2*10)}></Rating><span>{item.rating.value}</span></div>
                                </a>
                            </li>)
                        })
                    }
                </ul>
            </div>
            <div className="fictionBooks">
                <div className="top">
                    <h3>最受关注图书|非虚构类</h3>
                    <a onClick={this.goMore.bind(this,this.state.unfictionType)}>更多>></a>
                </div>
                <ul>
                    {
                        this.state.unfictionList.map((item)=>{
                            return (<li key={item.id}>
                                <a onClick={this.goDetail.bind(this,this.state.unfictionType,item.id)}>
                                    <div className="img"><img src={item.cover.url} alt="books"/></div>
                                    <span className="title">{item.title}</span>
                                    <div className="evaluate"><Rating  length={Math.floor(item.rating.value/item.rating.max/2*10)}></Rating><span>{item.rating.value}</span></div>
                                </a>
                            </li>)
                        })
                    }
                </ul>
            </div>
            <div className="fictionBooks">
                <div className="top">
                    <h3>豆瓣书店</h3>
                    <a>更多>></a>
                </div>
                <div className="desc">
                    <div className="desc-left">
                        <img src={this.state.a} alt="books" />
                        {
                            Object.keys(this.state.obj).map((item,index)=>{
                                if(item==='title'){
                                    return (<div key={index}>
                                        {this.state.obj[item]}
                               </div>)
                                }
                            })
                        }
                    </div>
                </div>
                <ul>
                    {
                        this.state.libraireList.map((item,index)=>{
                            return (<li key={index}>
                                <a onClick={this.goDetail.bind(this,this.state.libraireType,item.id)}>
                                    <div className="img"><img src={item.cover.url} alt="books"/></div>
                                    <span className="title">{item.title}</span>
                                    <div className="evaluate"><span>￥{item.price}</span></div>
                                </a>
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>)
    }
}

export default Books;