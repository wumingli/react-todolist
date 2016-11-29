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
        </div>
    </Router>
);
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Store.fetch()
        };
        this.addTodo = this.addTodo.bind(this);
        this.clearDone.bind(this);/**/
    }
    addTodo(e) {
        e.preventDefault();
        let ipt = e.target.querySelector('input');
        if (ipt.value.trim() === '') {
            return;
        }
        this.setState({
            data: this.state.data.concat({
                title: ipt.value,
                done: false
            })
        }, () => {
            Store.save(this.state.data);
            ipt.value = '';
        });
    }
    removeTodo(todo) {
        let tempData = [];
        this.state.data.map((item) => {
            if (todo !== item) {
                tempData.push(item);
            }
        });

        this.setState({
            data: tempData
        });
        Store.save(tempData);
    }
    updateTodo(todo) {
        let tempData = this.state.data.map((item) => {
            if (todo === item) {
                item.done = !todo.done;
            }
            return item;
        });
        this.setState({
            data: tempData
        });
        Store.save(tempData);
    }
    clearDone() {
        if (window.confirm('确认清除已完成的任务？')) {
            let tempData = [];
            this.state.data.map((item) => {
                if (!item.done) {
                    tempData.push(item);
                }
            });

            console.log('data after clear:', tempData);
            this.setState({
                data: tempData
            });

            Store.save(tempData);
        }
    }
    render() {
        var hasDoneData = false,
            activeCounter = 0;
        const currentPath = this.props.pathname.substring(1);
        const shownTodos = this.state.data.filter((todo) => {
            switch (currentPath) {
                case 'active':
                    return !todo.done;
                case 'done':
                    return todo.done;
                default:
                    return true;
            }
        });

        var List = shownTodos.map((item) => {
            var key = Math.random();
            if (item.done) {
                hasDoneData = true;
            } else {
                activeCounter++;
            }
            return (
                <li key={key} className={'todo' + (item.done ? ' completed': '')}>
                    <input onChange={() => {
                        this.updateTodo(item);
                    }}
                           checked={item.done}
                           className="toggle"
                           name={key}
                           id={key}
                           type="checkbox" />
                    <label htmlFor={key}>{item.title}</label>
                    <button className="destroy" onClick={() => {
                        this.removeTodo(item);
                    }} />
                </li>
            );
        });

        if (List.length === 0) {
            List = <li className="no-data"><span>暂无数据</span></li>;
        }

        return(
            <div className="todo-app">
                <h1>任务清单</h1>
                <form onSubmit={this.addTodo}>
                    <input className="new-todo" defaultValue={this.state.text} placeholder="回车添加新任务" />
                </form>
                <ul className="todo-list">
                    {List}
                </ul>
                <ul className="set-status">
                    <li className={currentPath === '' ? 'active' : ''}><Link to="/">全部</Link></li>
                    <li className={currentPath === 'active' ? 'active' : ''}><Link to="/active">未完成</Link></li>
                    <li className={currentPath === 'done' ? 'active' : ''}><Link to="/done">已完成</Link></li>
                </ul>
                {
                    currentPath !== 'done' ?
                        <span className="un-completed">还有<Link to="/active"><i>{activeCounter}</i></Link>个未完成的任务</span>
                        : null
                }
                {
                    hasDoneData
                        ? <span className="clear-done" onClick={this.clearDone.bind(this)}>清除已完成</span>
                        : null
                }

            </div>
        );
    }
}

render(<MainRouter/>, document.querySelector('#react'));
