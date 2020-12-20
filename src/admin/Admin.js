import React, {Component} from 'react';
import './Admin.css';

export default class Admin extends Component {
    render() {
        return (
            <>
            <h2>Users</h2>
            <article>
                 <h3><a href="#">Tessa Testerson</a></h3>
                 <p>Account created: 10/19/2020</p>
                 <p><a href="#">Stories created: 10</a></p>
                 <p><a href="#">Characters created: 34</a></p>
                 <p><a href="#">Settings created: 5</a></p>
                 <button>Delete User</button>
            </article>
            <article>
             <h3><a href="#">Cody Petersen</a></h3>
             <p>Account created: 7/19/2020</p>
             <p><a href="#">Stories created: 3</a></p>
             <p><a href="#">Characters created: 15</a></p>
             <p><a href="#">Settings created: 2</a></p>
             <button>Delete User</button>
         </article>
         <article>
             <h3><a href="#">Karen Fallon</a></h3>
             <p>Account created: 12/19/2019</p>
             <p><a href="#">Stories created: 1341</a></p>
             <p><a href="#">Characters created: 21234</a></p>
             <p><a href="#">Settings created: 234</a></p>
             <button>Delete User</button>
         </article>
         </>
        )
    }
}