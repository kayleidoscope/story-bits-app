import React, {Component} from 'react';
import './Character.css'

export default class Character extends Component {
    render() {
        return (
            <article className="character-deets">
                <h3>Anne Shirley</h3>
                <p>A brief description goes here.</p>
                <h4>Story:</h4>
                <p><a href="#">Anne of Green Gables</a></p>
                <h4>Short description:</h4>
                <p>An orphan girl with a penchant for large words and mischief.</p>
                <h4>Gender:</h4>
                <p>Female</p>
                <h4>Physical appearance:</h4>
                <p>Red hair, freckles, a pretty nose</p>
                <h4>Fashion style</h4>
                <p>Loves puff sleeves, but wears the plain clothes Marilla sews</p>
                <h4>Home</h4>
                <p><a href="#">Green Gables</a></p>
                <h4>Housemates</h4>
                <ul>
                    <li><a href="#">Marilla Cuthbert</a></li>
                    <li><a href="#">Matthew Cuthbert</a></li>
                </ul>
                <h4>Decor</h4>
                <p>Keeps flowers she finds in her room</p>
            </article>
        )
    }
}