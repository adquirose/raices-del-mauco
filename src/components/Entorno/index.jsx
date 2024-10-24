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
                { src: new URL('../../assets/entorno/centro-medico.png', import.meta.url).href, description:'Centro Médico' },
                { src: new URL('../../assets/entorno/colegio1.png', import.meta.url).href, description:'Colegio' },
                { src: new URL('../../assets/entorno/concon.png', import.meta.url).href, description:'Concon' },
                { src: new URL('../../assets/entorno/playa-amarilla.jpg', import.meta.url).href, description:'Playa' },
                { src: new URL('../../assets/entorno/colegio2.jpg', import.meta.url).href, description:'Colegio' },
                { src: new URL('../../assets/entorno/supermercado.png', import.meta.url).href, description:'Supermercado' },
                { src: new URL('../../assets/entorno/playa-la-boca.jpg', import.meta.url).href, description:'Playa' },
            ]}
        />
    )
}
export default Entorno