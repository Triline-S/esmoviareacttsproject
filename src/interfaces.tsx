export interface CInputInt {
    type : string
    name : string
    design: string
    placeholder : string
    onChange : (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Credentials {
    name: string
    password: string
}


export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface FavMovie {
    addedBy: string,
    movie: string
}

export interface Genre {
    id: number,
    name: string
}