/* eslint-disable react/prop-types */
const MobileContact = ({fill = 'currentColor', secondaryfill=fill, width='100%', height='100%', strokewidth='1'}) => {

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <g fill={secondaryfill} stroke={secondaryfill} strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="10" strokeWidth={strokewidth}>
                <path d="M31,31H17v0 c0-3.314,2.686-6,6-6h2C28.314,25,31,27.686,31,31L31,31z" fill="none"/>
                <path d="M36,46H12 c-2.209,0-4-1.791-4-4V6c0-2.209,1.791-4,4-4h24c2.209,0,4,1.791,4,4v36C40,44.209,38.209,46,36,46z" fill="none" stroke={fill}/>
                <circle cx="24" cy="18" fill="none" r="4"/>
                <line fill="none" stroke={fill} x1="8" x2="40" y1="8" y2="8"/>
                <line fill="none" stroke={fill} x1="8" x2="40" y1="37" y2="37"/>
            </g>
        </svg>
	);
};

export default MobileContact;