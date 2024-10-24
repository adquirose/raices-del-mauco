/* eslint-disable react/prop-types */

const ERemove = ({fill = 'currentColor', secondaryfill=fill, width='100%', height='100%'}) => {

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
			<g fill={secondaryfill}>
				<path d="M36.728,8.443l-12.728,12.729L11.272,8.443c-.391-.391-1.024-.391-1.414,0l-1.414,1.414c-.391,.391-.391,1.024,0,1.414l12.728,12.729-12.728,12.729c-.39,.391-.39,1.024,0,1.414l1.414,1.414c.391,.391,1.024,.391,1.414,0l12.728-12.729,12.728,12.729c.391,.391,1.024,.391,1.414,0l1.414-1.414c.391-.391,.391-1.024,0-1.414l-12.728-12.729,12.728-12.729c.39-.391,.39-1.024,0-1.414l-1.414-1.414c-.391-.391-1.024-.391-1.414,0Z" fill={fill}/>
			</g>
		</svg>
	);
};

export default ERemove;