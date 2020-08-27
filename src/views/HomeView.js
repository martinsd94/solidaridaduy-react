import React, { Fragment, useEffect, useState } from "react";
import {
  FaBars,
  FaSearch,
  FaTimes,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import donateJumbo from "../assets/svgs/donate_jumbo_home.svg";
import participateSvg from "../assets/svgs/participate_home.svg";
import donateSvg from "../assets/svgs/donate_home.svg";
import promoteSvg from "../assets/svgs/promote_home.svg";
import CategorySvg from "../components/CategorySvg";

/* Components */
import AppSvg from "../components/AppSvg";
import PageFooter from "../components/PageFooter";
import LoadingAnimation from "../components/LoadingAnimation";
import Modal from "../components/Modal";

/* Helpers */
import { filterBySearch } from "../helpers/searchFunctions";

/* Data hooks */
import { useData } from "../context/data";

import "../styles/home.scss";

const HomeView = () => {
  //const [scrollTop, setScrollTop] = useState(0);
  const [normalHeader, setNormalHeader] = useState(false);
  const windowHeight = window.innerHeight;

  useEffect(() => {
    const handleScroll = (e) => {
      if (window.scrollY > windowHeight - 80 && !normalHeader) {
        setNormalHeader(true);
      } else if (window.scrollY < windowHeight - 80 && normalHeader) {
        setNormalHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [normalHeader, windowHeight]);

  return (
    <div
      className="view-container"
      onScroll={() => {
        console.log("hola");
      }}
    >
      <HomeHeader scrolled={normalHeader} />
      <Landing />
      <Search />
      <Emergency />
      <About />
      <Collaborate />
      {/*<Photos />*/}
      {/*<Statistics />*/}
      <Contact />
      <PageFooter />
    </div>
  );
};

/* --------------------------------- */

const HomeHeader = ({ scrolled }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <React.Fragment>
      <header className={`home-header${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="home-link">
          Solidaridad.uy
        </Link>
        <nav>
          <div className="menu-widescreen">
            <Link to="/about" className="header-link">
              <p>¿QUIÉNES SOMOS?</p>
            </Link>
            <Link to="/collaborate" className="header-link">
              <p>¿CÓMO COLABORAR?</p>
            </Link>
            <Link to="/contact" className="header-link">
              <p>CONTACTO</p>
            </Link>
          </div>

          <button
            className="menu-button"
            onClick={() => {
              setDropdownVisible(true);
            }}
          >
            <p>
              <FaBars />
            </p>
          </button>
        </nav>
      </header>
      {dropdownVisible ? (
        <div className="menu-dropdown">
          <Link to="/about" className="dropdown-link">
            <p>¿QUIÉNES SOMOS?</p>
          </Link>
          <Link to="/collaborate" className="dropdown-link">
            <p>¿CÓMO COLABORAR?</p>
          </Link>
          <Link to="/contact" className="dropdown-link">
            <p>CONTACTO</p>
          </Link>
          <button
            className="dropdown-link"
            onClick={() => {
              setDropdownVisible(false);
            }}
          >
            <p>
              <FaTimes />
            </p>
          </button>
          <button
            className="dropdown-dim"
            onClick={() => {
              setDropdownVisible(false);
            }}
          ></button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

//

const Landing = () => {
  const [search, setSearch] = useState("");
  const { data, isDataFetching } = useData();
  const [filteredData, setFilteredData] = useState([]);

  const handleEnterPress = (event) => {
    if (event.keyCode === 13) {
      let link = document.getElementById("search-available");
      if (link) {
        link.click();
      }
    }
  };

  // TODO: Prevent from firing multiple times...
  useEffect(() => {
    document.addEventListener("keypress", handleEnterPress, false);
  }, []);

  // Fetch initiative data
  useEffect(() => {
    setFilteredData(filterBySearch(data, search));
  }, [setFilteredData, data, search]);

  return (
    <div className="full-screen landing-jumbo">
      <div className="landing-background">
        <div
          className={`landing-inner${
            search.length === 0 ? " search-empty" : ""
          }`}
        >
          <h1>SolidaridadUY</h1>
          <h3>
            Plataforma colaborativa de <br />
            iniciativas solidarias en Uruguay
          </h3>
          <div className="searchbar-wrapper">
            <input
              placeholder="Nombre, Barrio, Ciudad..."
              value={search}
              autoComplete="new-password"
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.length !== 0 ? (
              <Link to={`/search-results?search=${search}`}>
                <button id="search-available">
                  <FaSearch />
                </button>
              </Link>
            ) : (
              <Link
                to={`/search-results?search=${search}`}
                className="disabled-link"
              >
                <button>
                  <FaSearch />
                </button>
              </Link>
            )}
          </div>

          <div className="search-suggestions-wrapper">
            <div className="search-suggestions">
              {isDataFetching ? (
                <LoadingAnimation />
              ) : (
                <React.Fragment>
                  {filteredData.slice(0, 3).map((init) => (
                    <Link
                      to={`/initiative/${init._id}`}
                      className="option"
                      key={init._id}
                    >
                      {init.name}
                    </Link>
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//

const Search = () => {
  const { locationData } = useData();
  const [province, setProvince] = useState(undefined);
  const [hood, setHood] = useState(undefined);

  const onProvinceChange = (e) => {
    setProvince(e.target.value);
    setHood(undefined);
  };

  const getKeyFromIndex = (index) => {
    return Object.keys(locationData)[index];
  };

  const searchUrl = () => {
    let url = "/search-results";
    if (province) {
      url = `${url}?province=${province}`;
      if (hood) {
        url = `${url}&hood=${hood}`;
      }
    }
    return url;
  };

  return (
    <div className="search-jumbo">
      <div className="content-left">
        <h2>Iniciativas solidarias en el país</h2>
        <h4>
          Buscá iniciativas funcionando en tu barrio o ciudad y ponete en
          contacto
        </h4>
      </div>
      <div className="content-right">
        <select value={province} onChange={(e) => onProvinceChange(e)}>
          <option>Departamento..</option>
          {Object.keys(locationData).map((item, index) => (
            <option key={index} value={index}>
              {item}
            </option>
          ))}
        </select>
        <select value={hood} onChange={(e) => setHood(e.target.value)}>
          <option>Barrio..</option>
          {province !== undefined
            ? locationData[getKeyFromIndex(province)].map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))
            : null}
        </select>
        <Link to={searchUrl()}>
          <button className="button-green">Buscar</button>
        </Link>
      </div>
    </div>
  );
};

//

const Emergency = () => {
  const { data, isDataFetching } = useData();

  let content;
  if (isDataFetching) {
    content = <LoadingAnimation />;
  } else {
    content = data
      .filter((elem) => elem.emergency)
      .slice(0, 3)
      .map((elem, index) => (
        <Link
          to={`/initiative/${elem._id}`}
          key={index}
          className="initiative-card"
        >
          <div className="hover-effect"></div>
          <h4 className="name">{elem.name}</h4>
          <p className="location">
            {`${elem.hood}`}
            <br />
            {elem.province}
          </p>
          <CategorySvg category={elem.category} emergency={true} />
        </Link>
      ));
  }

  return (
    <Fragment>
      <div className="red-stripes"></div>
      <div className="emergency-jumbo">
        <h3>Iniciativas en</h3>
        <h2>Falta de Recursos</h2>
        <p>
          Estas iniciativas pueden necesitar manos para cocinar, alimentos, u
          otro tipo de recursos que impiden el funcionamiento de su iniciativa.{" "}
        </p>
        <div className="emergency-initiatives">{content}</div>
      </div>
      <div className="red-stripes"></div>
    </Fragment>
  );
};

//

const About = () => {
  return (
    <div className="about-jumbo">
      <img src={donateJumbo} alt="About" />
      <div className="text">
        <h2>Quiénes somos</h2>
        <h4>
          <span className="highlight">Solidaridad.uy</span> surge con el
          objetivo de centralizar la información y las necesidades de las
          diferentes iniciativas solidarias en Uruguay. Nuestro objetivo es
          facilitar y fomentar la colaboración entre personas y colectivos
          solidarios.
        </h4>
        <Link to="/about" style={{ textDecoration: "underline" }}>
          <button className="button-green">Ver más...</button>
        </Link>
      </div>
    </div>
  );
};

//

const Collaborate = () => {
  const [participateModalVisible, setParticipateModalVisible] = useState(false);
  const [donationModalVisible, setDonationModalVisible] = useState(false);
  const [promoteModalVisible, setPromoteModalVisible] = useState(false);

  return (
    <React.Fragment>
      <div className="collaborate-jumbo">
        <h2>Colaborá hoy</h2>
        <div className="collaboration-options">
          <div className="option">
            <img src={participateSvg} alt="Join" />
            <h4>Podés participar del proyecto de varias formas</h4>
            <button
              className="button-green"
              onClick={() => setParticipateModalVisible(true)}
            >
              Participar
            </button>
          </div>
          <div className="option">
            <img src={donateSvg} alt="Donate" />
            <h4>Colaborá hoy a través de una donación</h4>
            <button
              className="button-orange"
              onClick={() => setDonationModalVisible(true)}
            >
              Donar
            </button>
          </div>
          <div className="option">
            <img src={promoteSvg} alt="Promote" />
            <h4>Difundí nuestro proyecto en las redes</h4>
            <button
              className="button-red"
              onClick={() => setPromoteModalVisible(true)}
            >
              Compartir
            </button>
          </div>
        </div>
      </div>

      <Modal
        title="Cómo donar:"
        content={
          <div className="modal-content">
            <p>
              Contactate al <span className="highlight">092 555 425</span> para
              encontrar tu <b>punto de acopio</b> más cercano y/o consultar qué
              alimentos están haciendo falta.
            </p>
            <p>
              Doná a través de la <b>cuenta BROU de AUDYN</b>:
            </p>
            <p>
              <span className="highlight">001564567-00002</span>
              <br />
              <b>Asunto:</b> Ollas audyn1962@gmail.com
            </p>
          </div>
        }
        visible={donationModalVisible}
        _close={() => setDonationModalVisible(false)}
      />

      <Modal
        title="Cómo participar:"
        content={
          <div className="modal-content">
            <p>
              <span className="highlight">Relevamiento:</span> Contacto con
              vecinas y vecinos para actualizar datos.
            </p>
            <p>
              <span className="highlight">Logística:</span> Coordinar compra y
              transporte de donaciones.
            </p>
            <p>
              <span className="highlight">Transporte:</span> Ofrecer vehículo
              para transporte de donaciones.
            </p>
            <p>
              <span className="highlight">Difusión:</span> Dar difusión de las
              necesidades para fomentar flujo de donaciones.
            </p>
            <p>
              <span className="highlight">Manos a la Olla:</span> Sumarte a
              cocinar en las ollas que haga falta.
            </p>
            <p>
              Si querés participar de esta u otras formas, ponete en contacto a
              través del <span className="highlight">092 555 425</span>.
            </p>
          </div>
        }
        visible={participateModalVisible}
        _close={() => setParticipateModalVisible(false)}
      />

      <Modal
        title="Difundí nuestro proyecto"
        content={
          <div className="modal-content">
            <p>
              Seguinos en nuestras redes sociales, para ver y compartir las
              últimas actualizaciones.
            </p>
            <p>
              <FaFacebookSquare />
              <a href="https://www.facebook.com/solidaridadUY/">
                /solidaridaduy
              </a>
            </p>

            <p>
              <FaInstagramSquare />
              <a href="https://www.instagram.com/solidaridadUY/">
                @solidaridaduy
              </a>
            </p>

            <p>
              <FaTwitterSquare />
              <a href="https://twitter.com/SolidaridadUY">@solidaridaduy</a>
            </p>
          </div>
        }
        visible={promoteModalVisible}
        _close={() => setPromoteModalVisible(false)}
      />
    </React.Fragment>
  );
};

//

const Photos = () => {
  return (
    <div className="photos-jumbo">
      <div className="content-left">
        <div className="title">
          <AppSvg icon="PHOTOS" />
          <h2>Fotos</h2>
        </div>
        <h4>Insta - link</h4>
        <h4>Facebook - link</h4>
      </div>
      <div className="content-right">
        <div className="photo-wrapper"></div>
      </div>
    </div>
  );
};

//

const Statistics = () => {
  return (
    <div className="statistics-jumbo">
      <h3>Estadísticas</h3>
      <div className="statistics-wrapper">
        <div className="statistic">
          <h1>205</h1>
          <h4>Iniciativas solidarias en Uruguay</h4>
        </div>
        <div className="statistic">
          <h1>+10000</h1>
          <h4>Personas en situación precaria</h4>
        </div>
        <div className="statistic">
          <h1>+20000</h1>
          <h4>Horas semanales de trabajo solidario</h4>
        </div>
      </div>
    </div>
  );
};

//

const Contact = () => {
  return (
    <div className="contact-jumbo">
      <div className="content-left">
        <h2>Contacto</h2>
        <br />
        <h4>
          Envianos comentarios, ideas y sugerencias para seguir mejorando la
          plataforma. Si sos referente de una olla o querés generar una
          iniciativa en tu barrio, ponete en contacto para sumarte a la
          coordinadora de redes y ollas.
          <br />
          <br />
          También podés contactarnos directamente al mail{" "}
          <span>solidaridaduy@gmail.com</span>
        </h4>
      </div>
      <form
        className="content-right"
        action="mailto:solidaridaduy@gmail.com"
        method="POST"
        encType="multipart/form-data"
      >
        <input placeholder="Tu nombre / email..." />
        <textarea placeholder="Coméntanos algo..." />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default HomeView;
