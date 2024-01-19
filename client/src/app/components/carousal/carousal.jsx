import React from 'react';
import './carousal.css';
import ProductCard from '../productCard/productCard';

const Carousal = () => {
    const data = [
        {
            id: 1,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 1',
            description: 'Description 1'
        },
        {
            id: 2,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 2',
            description: 'Description 2'
        },
        {
            id: 3,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 3',
            description: 'Description 3'
        },
        {
            id: 4,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 4',
            description: 'Description 4'
        },
         {
            id: 5,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 5',
            description: 'Description 5'
        },
         {
            id: 6,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 6',
            description: 'Description 6'
        },
    ]

    return (
        <div className='carousal'>
            <div className="carouselItems">
                {data?.map((item) => {
                    return (
                        <ProductCard item={item} />
                    );
                })}
            </div>
        </div>
    )
}

export default Carousal;
