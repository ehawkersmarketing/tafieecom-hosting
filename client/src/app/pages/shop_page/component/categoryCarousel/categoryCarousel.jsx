import React from 'react';
import './categoryCarousel.css';
import CategoryCard from "../categoryCard/categoryCard";

const CategoryCarousel = () => {
    const data = [
        {
            id: 1,
            image: "https://s3-alpha-sig.figma.com/img/7121/fdd8/269c0ef8edd3f86f5c69a9b548a6be28?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RzTL2TEKMJ6CZUhODUuTzGLJmOo26DIRRKyJTQAMQEPgLXzVWgsvDfuILKhyNPINZhb36eqlGevNHBt9FNjjOJI5dm~UMAQgUdeAWnyXLTfAPSAsrYAIDOBU0dGMpmTXeWS-sSaQnojID2DK8bv-1UHLWWRU4pL6srlPjOW~kJsY-a-f~DIsDjin22wTevZJ67M-hNRH-UuZ8v6v0V3ruRTXsQ-nFFJnQfEdla00S5P3v89hESgusgDmArZmnC30M0a~l15DmhAwf7-mDgKiGnVHQ0uIibDdgjTzKUHwxM7XSuUebNk0lZFkwyE-AEy1sFPSwkqKKHSUJN~-Dybdlg__",
            title: 'Title 1',
            description: 'Description 1'
        },
        {
            id: 2,
            image: "https://s3-alpha-sig.figma.com/img/7121/fdd8/269c0ef8edd3f86f5c69a9b548a6be28?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RzTL2TEKMJ6CZUhODUuTzGLJmOo26DIRRKyJTQAMQEPgLXzVWgsvDfuILKhyNPINZhb36eqlGevNHBt9FNjjOJI5dm~UMAQgUdeAWnyXLTfAPSAsrYAIDOBU0dGMpmTXeWS-sSaQnojID2DK8bv-1UHLWWRU4pL6srlPjOW~kJsY-a-f~DIsDjin22wTevZJ67M-hNRH-UuZ8v6v0V3ruRTXsQ-nFFJnQfEdla00S5P3v89hESgusgDmArZmnC30M0a~l15DmhAwf7-mDgKiGnVHQ0uIibDdgjTzKUHwxM7XSuUebNk0lZFkwyE-AEy1sFPSwkqKKHSUJN~-Dybdlg__",
            title: 'Title 2',
            description: 'Description 2'
        },
        {
            id: 4,
            image: "https://s3-alpha-sig.figma.com/img/7121/fdd8/269c0ef8edd3f86f5c69a9b548a6be28?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RzTL2TEKMJ6CZUhODUuTzGLJmOo26DIRRKyJTQAMQEPgLXzVWgsvDfuILKhyNPINZhb36eqlGevNHBt9FNjjOJI5dm~UMAQgUdeAWnyXLTfAPSAsrYAIDOBU0dGMpmTXeWS-sSaQnojID2DK8bv-1UHLWWRU4pL6srlPjOW~kJsY-a-f~DIsDjin22wTevZJ67M-hNRH-UuZ8v6v0V3ruRTXsQ-nFFJnQfEdla00S5P3v89hESgusgDmArZmnC30M0a~l15DmhAwf7-mDgKiGnVHQ0uIibDdgjTzKUHwxM7XSuUebNk0lZFkwyE-AEy1sFPSwkqKKHSUJN~-Dybdlg__",
            title: 'Title 4',
            description: 'Description 4'
        },
    ]
    return (
        <div className='carousal'>
            <div className="categoryCarouselItems">
                {data?.map((item) => {
                    return (
                        <CategoryCard item={item} />
                    );
                })}
            </div>
        </div>
    )
}

export default CategoryCarousel;
