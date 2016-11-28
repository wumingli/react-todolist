'use strict';
import React from 'react';
import { render } from 'react-dom';
import Store from './src/store';
import Router from 'react-router/BrowserRouter';
import { BrowserRouter, Match, Miss, Link, Redirect } from 'react-router';
require('./css/main.scss');

let localData = Store.fetch();
localData = localData ? localData: [];

const NoMatch = () => (
    <div>
        <div className="match-error">
            <p>URL路径非法，请检查</p>
            <Link to="/">回首页</Link>
        </div>
    </div>
);
const MainRouter = () => (
    <Router>
        <div>
            <Match exactly pattern="/" component={Todo} />
            <Match exactly pattern="/active" component={Todo} />
            <Match pattern="/done" component={Todo} />
            <Miss component={NoMatch} />
            {/*<Redirect to="/" />*/}
        </div>
    </Router>
);
let Todo = React.createClass({
    getInitialState() {
        return {
            data: localData
        };
    },
    addTodo(e) {
        e.preventDefault();
        let ipt = e.target.querySelector('input');
        if (ipt.value.trim() === '') {
            return;
        }
        let newData = [{
            title: ipt.value,
            done: false
        }];
        localData = localData.length === 0 ? newData : localData.concat(newData);
        Store.save(localData);
        this.setState({
            data: localData
        });
        ipt.value = '';
    },
    updateTodo(todo) {
        this.state.data = localData.map((item) => {
            if (todo === item) {
                item.done = !todo.done;
            }
            return item;
        });
        this.setState({
            data: this.state.data
        });
        Store.save(this.state.data);
    },
    render() {
        console.log(this.props);
        const currentPath = this.props.pathname.substring(1);
        let List = localData.length === 0 ? null :
            this.state.data.map((item) => {
                var key = Math.random();
                return (
                    <li key={key} className={'todo' + (item.done ? ' completed': '')}>
                    <input onChange={this.updateTodo.bind(this, item)} checked={item.done} className="toggle" name={key} id={key} type="checkbox" />
                    <label htmlFor={key}>{item.title}</label>
                    <button className="destroy"/>
                    </li>
                );
            });

        return(
            <div className="todo-app">
                <h1>任务清单</h1>
                <form onSubmit={this.addTodo}>
                    <input className="new-todo" placeholder="回车添加新任务" />
                </form>
                <ul className="todo-list">
                {List}
                </ul>
                <ul className="set-status">
                    <li className={currentPath === '' ? 'active' : ''}><Link to="/">全部</Link></li>
                    <li className={currentPath === 'active' ? 'active' : ''}><Link to="/active">未完成</Link></li>
                    <li className={currentPath === 'done' ? 'active' : ''}><Link to="/done">已完成</Link></li>
                </ul>
            </div>
        );
    }
});

render(<MainRouter/>, document.querySelector('#react'));
