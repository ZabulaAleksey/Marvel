import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = '5509670ca3b50738fd0f3e881450a1da';

    const getAllCharacters = async (offset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset) => {
        const res = await request(`${_apiBase}/comics?format=comic&limit=8&offset=${offset}&apikey=${_apiKey}`);
        return res.data
    }

    const getComics = async (offset) => {
        const res = await request(`${_apiBase}/comics?format=comic&limit=8&offset=${offset}&apikey=${_apiKey}`);
    }


    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0,210)}...` : 'Description is empty',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getComics, getAllComics};
}

export default useMarvelService;