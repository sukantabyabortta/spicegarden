import { Link } from 'react-router-dom';

function Header({ logo, contact, languages }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">

          {/* Logo */}
          <div className="logo-section">
            <div className="org-info">
              <h1>
                <Link className="siteLogo" to="https://sukantabyabortta.github.io/spicegarden">
                      <img src={logo} alt="Site Logo" />
                </Link>
              </h1>
            </div>
          </div>

          {/* Right section */}
          <div className="header-right">
            <div className="header-actions">

              {/* Contact info */}
              <div className="contact-info">
                <span>
                  <i className="fas fa-phone"></i> {contact.phone}
                </span>
                <span>
                  <i className="fas fa-clock"></i> {contact.hours}
                </span>
              </div>

              {/* Language selector */}
              <div className="language-selector">
                <select>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
