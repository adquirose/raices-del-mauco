/* eslint-disable react/prop-types */
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css";

const Galeria = ({estado, setEstado}) => {
    const {sectionActiva} = estado
    return(
        <Lightbox
            open={sectionActiva}
            close={() => {
                setEstado({...estado, sectionActiva:false})
                
            }}
            slides={[
                { src: new URL('../../assets/galeria/1.jpg', import.meta.url).href, },
                { src: new URL('../../assets/galeria/2.jpg', import.meta.url).href, },
                { src: new URL('../../assets/galeria/5.jpg', import.meta.url).href, },
                { src: new URL('../../assets/galeria/6.jpg', import.meta.url).href, },
                { src: new URL('../../assets/galeria/7.jpg', import.meta.url).href, },
            ]}
        />
    )
}
export default Galeria