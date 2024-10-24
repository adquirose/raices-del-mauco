/* eslint-disable react/prop-types */

const Menu2 = ({fill = 'currentColor', secondaryfill=fill, width='100%', height='100%'}) => {
	
	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
			<g fill={secondaryfill}>
				<path d="M40,3H8c-2.761,0-5,2.239-5,5V40c0,2.761,2.239,5,5,5H40c2.761,0,5-2.239,5-5V8c0-2.761-2.239-5-5-5Zm-4,31H12c-.552,0-1-.448-1-1s.448-1,1-1h24c.552,0,1,.448,1,1s-.448,1-1,1Zm0-9H12c-.552,0-1-.448-1-1s.448-1,1-1h24c.552,0,1,.448,1,1s-.448,1-1,1Zm0-9H12c-.552,0-1-.448-1-1s.448-1,1-1h24c.552,0,1,.448,1,1s-.448,1-1,1Z" fill={fill}/>
			</g>
		</svg>
	);
};

export default Menu2;