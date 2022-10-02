import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components"
import Carousel from "react-material-ui-carousel";

const Images = styled.img`
	width: 100%;
	height: 100%;
`

const PostImages = ({ id, images }) => {
	const [index, setIndex] = useState(0)
	
	const handleChange=(cur, prev)=>{
		setIndex(cur);
	}

	if (images.length>0){
		return(
			<Carousel
				index={index}
				onChange={handleChange}
				animation="slide"
				autoPlay={false}
				indicators={true}
				>
			{images.map((image, i) => (
          <Images key={i} image={image} src={image.src.replace(/\/thumb\//, '/original/')} alt={image.src} />
        ))}
			</Carousel>
	)
	}  
};

PostImages.propTypes = {
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostImages;
