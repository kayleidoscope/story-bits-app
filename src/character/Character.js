import React, {Component} from 'react';
import Context from '../Context';
import dummyData from '../dummyData';
import {Link} from 'react-router-dom';
import './Character.css'

export default class Character extends Component {
    static contextType = Context;

    render() {
        
        const currentChar = this.props.match.params.charId;

        const charData = dummyData.characters.filter(char => char.id === currentChar)


        const housematesLIs = charData[0].housemates.map(hm => {
            return (
                <Link to={`/character/${hm.id}`} key={hm.id}>
                    <li>
                        {hm.name}
                    </li>
                </Link>
                
            )
        })

        return (
            <article className="character-deets">
                <h3>{charData[0].name}</h3>
                <p>{charData[0].description}</p>

                <h4>Story:</h4>
                <Link to={`/story/${charData[0].story.id}`}>
                    <p>{charData[0].story.name}</p>
                </Link>

                <h4>Gender:</h4>
                <p>{charData[0].gender}</p>

                <h4>Physical appearance:</h4>
                <p>{charData[0].appearance}</p>

                <h4>Fashion style</h4>
                <p>{charData[0].fashion}</p>

                <h4>Home</h4>
                <Link to={`/setting/${charData[0].home.id}`}>
                    <p>{charData[0].home.name}</p>
                </Link>
                
                <h4>Housemates</h4>
                <ul>
                    {housematesLIs}
                </ul>

                <h4>Decor</h4>
                <p>{charData[0].decor}</p>
            </article>
        )
    }
}