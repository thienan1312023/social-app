import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import './styles.css';

export const ImagesLightBox = ({ images, selectedImageIndex, handleCloseModal, animationStyles }) => {
    const [customStyle, setCustomStyle] = useState('');
    const [selectedIndexItem, setSelectedIndexItem] = useState('');
    const [imgAnimate, setImgAnimate] = useState('');
    useEffect(() => {
        setCustomStyle(animationStyles);
        setSelectedIndexItem(selectedImageIndex);
    }, [])

    const handleClose = () => {
        handleCloseModal();
        setCustomStyle("out-animation");
    }
    const handleNextClick = () => {
        if (selectedIndexItem < images.length - 1) {
            setSelectedIndexItem(selectedIndexItem + 1);
            setImgAnimate("img-animation");
            setTimeout(function () { setImgAnimate(""); }, 700);
        }

    }
    const handleToggleImage = (index) => {
        setSelectedIndexItem(index);
        setImgAnimate("img-animation");
        setTimeout(function () { setImgAnimate(""); }, 700);
    }
    const handlePreviousClick = () => {
        if (selectedIndexItem > 0) {
            setSelectedIndexItem(selectedIndexItem - 1);
            setImgAnimate("img-animation");
            setTimeout(function () { setImgAnimate(""); }, 700);
        }
    }
    return (
        <div className={`images-light-box-container ${customStyle}`}>
            <div className="btn-close-modal" onClick={handleClose}>
                <CloseIcon fontSize="inherit" />
            </div>
            <div className="nav-btn nav-btn-left" onClick={handlePreviousClick}>
                <ChevronLeftIcon fontSize="inherit" />
            </div>
            <div className="nav-btn nav-btn-right" onClick={handleNextClick}>
                <ChevronRightIcon fontSize="inherit" />
            </div>
            <div className={`lightbox-content ${imgAnimate}`}>
                <img src={images[selectedIndexItem]} alt="" className="img-sho" />
            </div>
            <div className="category-img-container">
                {
                    images.map((image, index) =>
                        <div
                            className={"layout-item " + (index === selectedIndexItem ? "border-white-primary" : "")}
                            key={index}
                            onClick={() => handleToggleImage(index)}>
                            <img src={image} alt="img-post" className="layout-image" />
                        </div>)
                }
            </div>

        </div>
    )
}