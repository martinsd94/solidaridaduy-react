import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import participateSvg from "../assets/svgs/participate_home.svg";
import donateSvg from "../assets/svgs/donate_home.svg";
import promoteSvg from "../assets/svgs/promote_home.svg";

const CollaborateView = () => {
  return (
    <div className="info-page">
      <img src={participateSvg} className="svg" alt="" />
      <h3>Cómo participar</h3>
      <p>
        <span className="highlight">Relevamiento:</span> Contacto con vecinas y
        vecinos para actualizar datos.
      </p>
      <p>
        <span className="highlight">Logística:</span> Coordinar compra y
        transporte de donaciones.
      </p>
      <p>
        <span className="highlight">Transporte:</span> Ofrecer vehículo para
        transporte de donaciones.
      </p>
      <p>
        <span className="highlight">Difusión:</span> Dar difusión de las
        necesidades para fomentar flujo de donaciones.
      </p>
      <p>
        <span className="highlight">Manos a la Olla:</span> Sumarte a cocinar en
        las ollas que haga falta.
      </p>
      <p>
        Si querés participar de esta u otras formas, ponete en contacto a través
        del <span className="highlight">092 555 425</span>.
      </p>

      <br />
      <br />
      <img src={donateSvg} className="svg" alt="" />
      <h3 className="orange-text">Cómo donar</h3>
      <p>
        Contactate al <span className="highlight orange-text">092 555 425</span>{" "}
        para encontrar tu <b>punto de acopio</b> más cercano y/o consultar qué
        alimentos están haciendo falta.
      </p>
      <p>
        Doná a través de la <b>cuenta BROU de AUDYN</b>:
      </p>
      <p>
        <span className="highlight orange-text">001564567-00002</span>
        <br />
        <b>Asunto:</b> Ollas audyn1962@gmail.com
      </p>

      <br />
      <br />

      <img src={promoteSvg} className="svg" alt="" />
      <h3 className="red-text">Difundí nuestro proyecto</h3>
      <p>
        Seguinos en nuestras redes sociales, para ver y compartir las últimas
        actualizaciones.
      </p>
      <p>
        <FaFacebookSquare />
        {"  "}
        <a href="https://www.facebook.com/solidaridadUY/" className="red-link">
          /solidaridaduy
        </a>
      </p>

      <p>
        <FaInstagramSquare />
        {"  "}
        <a href="https://www.instagram.com/solidaridadUY/" className="red-link">
          @solidaridaduy
        </a>
      </p>

      <p>
        <FaTwitterSquare />
        {"  "}
        <a href="https://twitter.com/SolidaridadUY" className="red-link">
          @solidaridaduy
        </a>
      </p>
    </div>
  );
};

export default CollaborateView;
