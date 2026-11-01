import React, { useEffect, useRef, useState } from 'react'
import "./Header.css"
import profile from "../../assets/profile.jpg"
import logo from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { closeGPT, toogleGPT } from '../../redux/gptSlice';
import { IoSparkles, IoHome, IoChevronDown, IoLogOutOutline, IoArrowBack } from "react-icons/io5";

const Header = ({ showBack = false }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userFound = useSelector(store => store.user);
  const gptVal = useSelector(store => store.gpt.toogleGPTSearch);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close the profile menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const handleKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const handleLogoClick = () => {
    if (!userFound) return;
    dispatch(closeGPT());
    navigate("/browse");
  }

  const handleSignoutAuth = () => {
    setMenuOpen(false);
    signOut(auth);
  }

  const displayName = userFound?.displayName || userFound?.email?.split("@")[0];

  return (
    <header className={`browse-header ${scrolled || !userFound ? "" : "is-transparent"} ${scrolled ? "is-scrolled" : ""}`}>
      <button className='logo-button' onClick={handleLogoClick} aria-label='FilmyGPT home' disabled={!userFound}>
        <img src={logo} alt='FilmyGPT' className='logo' />
      </button>

      {userFound && (
        <div className='header-actions'>
          {showBack ? (
            <button className='header-pill' onClick={() => navigate("/browse")}>
              <IoArrowBack /> <span>Back to browse</span>
            </button>
          ) : (
            <button className={`header-pill ${gptVal ? "" : "is-accent"}`} onClick={() => dispatch(toogleGPT())}>
              {gptVal ? <><IoHome /> <span>Home</span></> : <><IoSparkles /> <span>GPT Search</span></>}
            </button>
          )}

          <div className='profile-menu' ref={menuRef}>
            <button
              className='profile-trigger'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-haspopup='menu'
              aria-expanded={menuOpen}
              aria-label='Account menu'
            >
              <img src={profile} className='profile-icon' alt='' />
              <IoChevronDown className={`chevron ${menuOpen ? "is-open" : ""}`} />
            </button>

            {menuOpen && (
              <div className='profile-dropdown' role='menu'>
                <div className='profile-info'>
                  <img src={profile} alt='' />
                  <div>
                    <p className='profile-name'>{displayName}</p>
                    <p className='profile-email'>{userFound.email}</p>
                  </div>
                </div>
                <button className='dropdown-item' role='menuitem' onClick={handleSignoutAuth}>
                  <IoLogOutOutline /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header;
