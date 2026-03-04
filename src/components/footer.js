import { Link } from 'react-router-dom';
function Footer({
  logo,
  description,
  contact,
  menus,
  hours,
  social,
  copyright,
  credit
}) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">

          {/* Logo + Contact */}
          <div className="footer-section">
            <Link className="footerLogo" to="https://sukantabyabortta.github.io/spicegarden">
                <img src={logo} alt="Site Logo" />
            </Link>
            <p>{description}</p>

            <div className="contact-info">
              {contact.map((item, i) => (
                <p key={i}>
                  <i className={item.icon}></i> {item.text}
                </p>
              ))}
            </div>
          </div>

          {/* Menu Sections */}
          {menus.map((menu, i) => (
            <div className="footer-section" key={i}>
              <h4>{menu.title}</h4>
              <ul>
                {menu.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Opening Hours */}
          <div className="footer-section">
            <h4>Opening Hours</h4>
            <ul>
              {hours.map((time, i) => (
                <li key={i}>{time}</li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              {social.map((item, i) => (
                <a href={item.href} key={i}>
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>{copyright}</p>
          <p>{credit}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
