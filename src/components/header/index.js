import React,{Component} from 'react';
import './header.scss';
import {NavLink,} from 'react-router-dom';
class Header extends Component{
    render(){
        return (<div className="myHeader">
            <NavLink to='./home'><h1>豆瓣</h1></NavLink>
            <ul>
                {
                    this.props.navList.map((item,index)=>{
                        return <li key={index}><NavLink to={item.path}>{item.name}</NavLink></li>
                    })
                }
            </ul>
            </div>
        )
    }
}
Header.defaultProps={
    navList:[{
        name:'电影',
        path:'/films'
    },{
        name:'图书',
        path:'/books'
    },{
        name:'广播',
        path:'/radio'
    },{
        name:'小组',
        path:'/group'
    },{
        name:'搜索',
        path:'/search'
    }]
}

export default Header;