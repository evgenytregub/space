import React, {Component} from 'react';
import './postListItem.scss';

export default class PostListItem extends Component {

    onImportant() {
        this.setState(({important}) => ({
            important: !important
        }))
    }

    onLike() {
        this.setState(({like}) => ({
            important: !like
        }))
    }

     render() {
        const {label, onDelete, onToggleImportant, onToggleLiked, important, like} = this.props;
        let classNames = "app-list-item d-flex justify-content-between";
        if (important) {
            classNames += " important";
        }
         if (like) {
             classNames += " like";
         }
        return(
            <div className={classNames}>
                <span
                    className="app-list-item-label"
                    onClick={onToggleLiked}
                >
                    {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="bnt-star btn-sm"
                    onClick={onToggleImportant}
                    >
                        <i className="bi bi-star-fill"></i>
                    </button>
                    <button
                        type="button"
                        className="bnt-trash btn-sm"
                        onClick={onDelete}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                    <i className="fa bi-suit-heart"></i>
                </div>
            </div>
        )
    }
}
