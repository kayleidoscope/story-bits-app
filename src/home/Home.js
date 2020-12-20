import React, {Component} from 'react';
import './Home.css';

/* Somewhere down this line, this should probably be broken up into more components. */

export default class Home extends Component {
    render () {
        return (
            <>
                <h2>My Stories</h2>
                <article>
                    <h3>Anne of Green Gables</h3>
                    <p>A brief description goes here.</p>
                    <section>
                        <h4>Characters</h4>
                            <ul>
                                <li><a href="#">Anne Shirley</a></li>
                                <li><a href="#">Marilla Cuthbert</a></li>
                                <li><a href="#">Matthew Cuthbert</a></li>
                            </ul>
                    </section>
                    <section>
                        <h4>Settings</h4>
                            <ul>
                                <li><a href="#">Green Gables</a></li>
                                <li><a href="#">The schoolhouse</a></li>
                                <li><a href="#">Diana's house</a></li>
                            </ul>
                    </section>
                </article>
                <article>
                    <h3>Vampire Academy</h3>
                    <p>A brief description goes here.</p>
                    <section>
                        <h4>Characters</h4>
                        <ul>
                            <li><a href="#">Rose</a></li>
                            <li><a href="#">Lissa</a></li>
                            <li><a href="#">Dimitri</a></li>
                        </ul>
                    </section>
                    <section>
                        <h4>Settings</h4>
                        <ul>
                            <li><a href="#">Rose and Lissa's room</a></li>
                            <li><a href="#">The gym</a></li>
                            <li><a href="#">The dungeon</a></li>
                        </ul>
                    </section>
                </article>
            </>
        )
    }
}