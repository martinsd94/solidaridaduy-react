import React from "react";
import acaestamoslogo from "../assets/logos/acaestamos.png";
import adasu from "../assets/logos/adasu.jpg";
import audyn from "../assets/logos/audyn.png";
import cecso from "../assets/logos/cecso.png";
import ceda from "../assets/logos/CEDA.jpg";
import complejosacude from "../assets/logos/Complejo sacude.png";
import entre from "../assets/logos/entre.png";
import feuu from "../assets/logos/FEUU.jpg";
import fumtep from "../assets/logos/fum tep.jpeg";
import galponcorrales from "../assets/logos/galponcorrales.jpg";
import intersocialsur from "../assets/logos/Intersocial Sur.jpg";
import radiopedal from "../assets/logos/radio pedal.png";
import rebelarte from "../assets/logos/rebelarte.jpeg";
import redalco from "../assets/logos/redalco.png";
import redoeste from "../assets/logos/redoeste.jpg";
import redalsur from "../assets/logos/Red de Ollas al Sur.png";
import smu from "../assets/logos/smu.png";
import sumefac from "../assets/logos/sumefac.png";

import "../styles/about.scss";

const AboutView = () => {
  return (
    <div className="info-page">
      <h3>¿Cómo surge?</h3>
      <p>
        <b>Solidaridad.uy</b> es una plataforma web creada por estudiantes,
        docentes y egresados de Facultad de Ingeniería que nuclea diversas
        organizaciones y personas. Tiene como objetivo fomentar el{" "}
        <b>
          trabajo colectivo y coordinado en el fortalecimiento de las redes
          solidarias
        </b>
        . Se trabaja sobre una base de datos única y actualizada que identifica
        las iniciativas solidarias de cada localidad. El relevamiento de estos
        datos surge del contacto telefónico y presencial con actores sociales y
        redes vecinales.
        <br />
        <br />
        En lo que refiere al trabajo de campo, quienes colaboran en tareas de
        logística, compras y transporte funcionan como nexo entre las donaciones
        y las necesidades específicas en ollas y merenderos populares.
        <br />
        <br />
        Adicionalmente, se hace difusión de las necesidades territoriales y se
        visibiliza el trabajo que se lleva adelante en formato fotográfico y
        audiovisual. Se estimula desde estos lugares la construcción de
        conocimiento socialmente valioso y herramientas adaptadas a la realidad
        nacional.
      </p>
      {/*<p>
        Solidaridad.uy surge de un colectivo de estudiantes, egresados y
        docentes de la Facultad de Ingeniería - UDELAR.
      </p>
      <p>
        En principio pensamos dar difusión a los datos en una página web con
        barra de filtros ya que entendimos es una herramienta digital simple e
        intuitiva. Partiendo de esa base, dimos cuenta de la necesidad del
        relevamiento constante ya que las situaciones son muy dinámicas. Para
        esto convocamos a organizaciones sociales institucionales o no
        institucionales que tengan llegada territorial a trabajar en una base de
        datos y un proyecto web colaborativo.
      </p>
      <p>
        Se planteó la idea de utilizar una planilla común donde mediante llamada
        telefónica o contacto territorial se puedan relevar las necesidades
        específicas para mover las redes solidarias y hacer llegar los recursos
        de forma coherente y organizada. La planilla está organizada por zonas
        que concuerdan con los municipios, y cuenta con un mapa de recursos que
        incluye referencias territoriales y apoyos específicos.
      </p>
      <p>
        Mediante su Centro de Estudiantes, la Facultad de Ciencias Sociales pone
        a disposición sus instalaciones del Call Center para convocar a
        estudiantes y otras personas interesadas a hacer el relevamiento
        telefónico necesario.
      </p>
      <p>
        A partir de las primeras semanas de desarrollo surge la importancia del
        acercamiento territorial por parte del SMU, AUDyN, ADASU con el apoyo de
        la IMM. También surge la oportunidad de utilizar las instancias de
        relevamiento y la información organizada zonalmente para conseguir datos
        de valor que sirvan a determinadas respuestas a llevar a cabo (por
        ejemplo: cantidad de personas que asisten a las ollas o interés de ser
        testeados por covid-19).
      </p>
      <p>
        Desde entonces se organizan brigadas de relevamiento territorial,
        coordinadas con distintos referentes territoriales. Se comienza por la
        zona periférica donde creemos la organización solidaria entre vecinos de
        los barrios siempre respondió de manera rápida y efectiva, y el problema
        es históricamente la falta de recursos y de articulación social.
      </p>
      <p>
        En paralelo al grupo de relevamiento se arma un grupo de enlace
        territorial con personas dispuestas a trabajar de forma voluntaria, y
        responsables por zona que puedan organizar los grupos en sus distintas
        categorías de aporte: logística, salud y nutrición, donaciones,
        transporte, comunicación, educación. Se alcanzan las donaciones urgentes
        para asegurar necesidades básicas semana a semana, material sobre
        cuidados sanitarios, manejo del alimento (recetarios, información
        nutricional) y líneas de ayuda. A su vez se entabla contacto con las
        distintas realidades sociales lo que permite facilitar las redes de
        comunicación y unir los apoyos específicos con las necesidades
        específicas.
        </p>*/}

      <h3>¿Quiénes integran Solidaridad.uy?</h3>
      <p>
        Algunas de las organizaciones que hasta el momento han aportado al
        proyecto desde la comprensión de datos, donaciones, o que hacen uso de
        la base de datos para organizar mejor sus propios aportes son:
      </p>
      <ul className="logos">
        <li>
          <img alt="Acá estamos" src={acaestamoslogo} />
        </li>
        <li>
          <img alt="Adasu" src={adasu} />
        </li>
        <li>
          <img alt="Audyn" src={audyn} />
        </li>
        <li>
          <img alt="Cecso" src={cecso} />
        </li>
        <li>
          <img alt="CEDA" src={ceda} />
        </li>
        <li>
          <img alt="Complejo Sacude" src={complejosacude} />
        </li>
        <li>
          <img alt="Entre" src={entre} />
        </li>
        <li>
          <img alt="FEUU" src={feuu} />
        </li>
        <li>
          <img alt="Fum Tep" src={fumtep} />
        </li>
        <li>
          <img alt="Galpón de Corrales" src={galponcorrales} />
        </li>
        <li>
          <img alt="Intersocial Sur" src={intersocialsur} />
        </li>
        <li>
          <img alt="Radio Pedal" src={radiopedal} />
        </li>
        <li>
          <img alt="Rebelarte" src={rebelarte} />
        </li>
        <li>
          <img alt="Redalco" src={redalco} />
        </li>
        <li>
          <img alt="Red Oeste" src={redoeste} />
        </li>
        <li>
          <img alt="Red de Ollas al Sur" src={redalsur} />
        </li>
        <li>
          <img alt="Smu" src={smu} />
        </li>
        <li>
          <img alt="Sumefac" src={sumefac} />
        </li>
      </ul>
      <p>
        y otras personas particulares que se acercan a disposición del trabajo
        necesario o acercando donaciones.
      </p>
    </div>
  );
};

export default AboutView;
