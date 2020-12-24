import React, {Component} from 'react';
import Context from '../Context';
import dummyData from '../dummyData';
import './Character.css'

export default class Character extends Component {
    static contextType = Context;

    render() {
        
        const currentChar = this.context.currentChar;

        const charData = dummyData.characters.filter(char => char.id == currentChar)

        const housematesLIs = charData[0].housemates.map(hm => {
            return (
                <li key={hm.id}>
                    <a href="#">{hm.name}</a>
                </li>
            )
        })

        return (
            <article className="character-deets">
                <h3>Anne Shirley</h3>
                <p>{charData[0].description}</p>

                <h4>Story:</h4>
                <p><a href="#">{charData[0].story.name}</a></p>

                <h4>Gender:</h4>
                <p>{charData[0].gender}</p>

                <h4>Physical appearance:</h4>
                <p>{charData[0].appearance}</p>

                <h4>Fashion style</h4>
                <p>{charData[0].fashion}</p>

                <h4>Home</h4>
                <p><a href="#">{charData[0].home.name}</a></p>

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