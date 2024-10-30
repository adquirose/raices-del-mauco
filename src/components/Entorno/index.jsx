/* eslint-disable react/prop-types */
import Lightbox from "yet-another-react-lightbox"
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const Entorno = ({estado, setEstado}) => {
    const {sectionActiva} = estado
    return(
        <Lightbox
            plugins={[Captions]}
            open={sectionActiva}
            close={() => {
                setEstado({...estado, sectionActiva:false})
                
            }}
            slides={[
                { src: new URL('../../assets/entorno/playa.jpg', import.meta.url).href, description:'Playa' },
                { src: new URL('../../assets/entorno/playa1.jpg', import.meta.url).href, description:'Playa' },
                { src: new URL('../../assets/entorno/3.jpg', import.meta.url).href, description:'' },
                { src: new URL('../../assets/entorno/4.jpg', import.meta.url).href, description:'Colegio' },
                { src: new URL('../../assets/entorno/6.jpg', import.meta.url).href, description:'Supermercado' },
                { src: new URL('../../assets/entorno/7.jpg', import.meta.url).href, description:'Supermercado' },
                { src: new URL('../../assets/entorno/8.jpg', import.meta.url).href, description:'Comercio' },
            ]}
        />
    )
}
export default Entorno