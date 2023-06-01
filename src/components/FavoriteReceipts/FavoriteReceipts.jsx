import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../api/fakeApi/fakeFavoriteDB.json'
import './FavoriteReceipts.scss'
import { ReactComponent as TrashIcon } from './trash.svg';

export const FavoriteReceipts = () => {
  const favorites = data
 console.log(data)
  return (
    <div className="favorites-container">
      <ul className="favorites-list">
        {favorites.map(favorite => (
          <li key={favorite._id.$oid} className="favorite-item">
            <div className="favorite-img-wrapper">
              <img src={favorite.preview} alt="food" className="favorite-img" />
            </div>
            <h2 className="favorite-title">{favorite.title}</h2>
            <button
              className="favorite-delete-btn"
              type="button"
              // onClick={() => handleDelete(favorite._id.$oid)}
            >
              <TrashIcon />
            </button>
            <p className="favorite-description">{favorite.description}</p>
            <span className="favorite-time">{favorite.time}</span>
            <Link className="favorite-link" to={`/recipe/${favorite._id.$oid}`}>
              See recipe
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
