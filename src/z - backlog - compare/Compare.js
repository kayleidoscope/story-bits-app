import React, {Component} from 'react';
import './Compare.css';

/* Backlogged */

/* Refactor to use character component if there's time*/

export default class Compare extends Component {
    render() {
        return (
            <div className="compare">
                <h2>Anne Shirley vs. Marilla Cuthbert</h2>
                <div className="container">
                    <article>
                        <h3>Anne Shirley</h3>
                        <p>A brief description goes here.</p>
                        <h4>Story:</h4>
                        <p>Anne of Green Gables</p>
                        <h4>Short description:</h4>
                        <p>An orphan girl with a penchant for large words and mischief.</p>
                        <h4>Gender:</h4>
                        <p>Female</p>
                        <h4>Physical appearance:</h4>
                        <p>Red hair, freckles, a pretty nose</p>
                        <h4>Fashion style</h4>
                        <p>Loves puff sleeves, but wears the plain clothes Marilla sews</p>
                        <h4>Home</h4>
                        <p>Green Gables</p>
                        <h4>Housemates</h4>
                        <ul>
                            <li>Marilla Cuthbert</li>
                            <li>Matthew Cuthbert</li>
                        </ul>
                        <h4>Decor</h4>
                        <p>Keeps flowers she finds in her room</p>
                    </article>
                    <article>
                        <h3>Marilla Cuthbert</h3>
                        <p>A brief description goes here.</p>
                        <h4>Story:</h4>
                        <p>Anne of Green Gables</p>
                        <h4>Short description:</h4>
                        <p>A stern, practical woman who loves Anne deeply.</p>
                        <h4>Gender:</h4>
                        <p>Female</p>
                        <h4>Physical appearance:</h4>
                        <p>Gray hair, wears glasses</p>
                        <h4>Fashion style</h4>
                        <p>Plain, pratical clothes</p>
                        <h4>Home</h4>
                        <p>Green Gables</p>
                        <h4>Housemates</h4>
                        <ul>
                            <li>Marilla Cuthbert</li>
                            <li>Matthew Cuthbert</li>
                        </ul>
                        <h4>Decor</h4>
                        <p>Simple</p>
                    </article>
                </div>
            </div>
        )
    }
}