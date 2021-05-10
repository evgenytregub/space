import React, {Component} from 'react';
import Header from "../components/header/header";
import Search from "../components/search/search";
import Filter from "../components/filter/filter";
import PostList from "../components/postsList/postsList";
import PostAdd from "../components/postAdd/postAdd";

export default class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'test 1', important: true, like:false, id: 1},
                {label: 'test 2', important: false, like:false, id: 2},
                {label: 'test 3', important: false, like:false, id: 3}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const  newItem = {...old, important: !old.important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const  newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }
        return  items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items;
        }
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render () {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        return (
            <div className="ws_right">
                <Header
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <Search
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <Filter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAdd
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}
