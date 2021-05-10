import React from 'react';
import PostListItem from '../postListItem'
import { ListGroup } from 'reactstrap';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
    const  elements = posts.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={id} lassName="list-group-item">
                <PostListItem
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}
                />
            </li>
        )
    });
    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;