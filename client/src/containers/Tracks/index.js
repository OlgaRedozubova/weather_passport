import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Stream from '../../components/Stream';

const tracks = [
    {
        title: 'Some track'
    },
    {
        title: 'Some other track'
    }
];


class Track extends Component {
    render () {
        return(
            <div>
                <Stream />
            </div>
        )
    }
}

export default Track;