import React, {Component} from 'react';
import './Story.css';

/* This should be broken up into more components. */

export default class Story extends Component {
    render() {
        return (
            <>
                <h2>Anne of Green Gables</h2>
                <p>A brief description goes here.</p>
                <article>
                    <section>
                        <h3>Characters</h3>
                            <ul>
                                <li className="summary">
                                    <a href="#">Anne Shirley</a>
                                    <p>Short character description</p>
                                </li>
                                <li className="summary">
                                    <a href="#">Marilla Cuthbert</a>
                                    <p>Short character description</p>
                                </li>
                                <li className="summary">
                                    <a href="#">Matthew Cuthbert</a>
                                    <p>Short character description</p>
                                </li>
                            </ul>
                    </section>
                    <section>
                        <h3>Settings</h3>
                            <ul>
                                <li className="summary">
                                    <a href="#">Green Gables</a>
                                    <p>Short setting description</p>
                                </li>
                                <li className="summary">
                                    <a href="#">The schoolhouse</a>
                                    <p>Short setting description</p>
                                </li>
                                <li className="summary">
                                    <a href="#">Diana's house</a>
                                    <p>Short setting description</p>
                                </li>
                            </ul>
                    </section>
                </article>
            </>
        )
    }
}