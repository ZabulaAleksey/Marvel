import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        chars: {},
        loading: true,
        error: false
    };

    marvelService = new MarvelService();

    updateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharsLoaded = (chars) => {
        this.setState({
            chars,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    charList = (chars) => {
        return (
            chars.map(item => 
                (
                    <li className="char__item">
                    <img src={item.thumbnail} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                    </li>
                )
            )
        )
    }

    componentDidMount() {
        this.updateChars();
    }

    render() {
        const {chars, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? this.charList(chars) : null;
    
        return (
            <div className="char__list">
                <ul className="char__grid">
        
                {errorMessage}
                {spinner}
                {content}
        
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
            )
    }

};

export default CharList;