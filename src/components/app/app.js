import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';


import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John C.", salary: 800, increase: false, rise: false, id: 1},
                {name: "Alex M.", salary: 3000, increase: true, rise: false, id: 2},
                {name: "Carl W.", salary: 5000, increase: false, rise: false, id: 3},
            ],
            term: ''
        }
        this.maxId = 4;
    }

    




    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        /*this.setState(({data}) => {
            const newArr = data.slice();
            newArr.push(newItem)
            return {
                data: newArr
            }
        })*/
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
                
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}

                }
                return item;
            })
        }))
    }
 

    onDelete = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    searchEmp = (item, term) => {
        if (item.length === 0) {
            return item;
        }

        return item.filter((item) => {
            return item.name.indexOf(term) > -1;
        })
    }
    onUpdateSearch = (term) => {
        this.setState({term});
    }

    render() {
        const {data, term} = this.state;
        const employers = this.state.data.length;
        const increases = this.state.data.filter(item => item.increase).length;
        const visibaleData = this.searchEmp(data, term);

        return (
            <div className="app">
                <AppInfo
                employers={employers}
                increases={increases} />
    
                <div className="search-panel">
                    <SearchPanel 
                    onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter/>
                </div>
                <EmployeesList 
                data={visibaleData}
                onDelete={this.onDelete}
                onToggleProp={this.onToggleProp} />
                <EmployersAddForm
                onAdd={this.addItem} />
            </div>
        );
    }


}

export default App;