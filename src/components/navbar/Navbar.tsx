"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoGlobeOutline, IoChevronDown, IoMenu, IoClose } from 'react-icons/io5';
import GenericButton from '@/components/GenericButton/GenericButton';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';

interface NavbarProps {
  onLogin?: () => void;
}

const Navbar = ({ onLogin }: NavbarProps) => {
  const router = useRouter();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ES');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Planes', id: 'planes' },
    { name: 'Testimonios', id: 'testimonios' },
    { name: 'Contacto', id: 'contacto' },
  ];

  const languages = ['ES', 'EN'];

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      router.push('/login');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // altura del navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        <div className={styles.logoImage}>
          <Image 
            src={logo} 
            alt="EyeBek Logo" 
            width={60} 
            height={60} 
            className={styles.logoImage} 
          />
        </div>

        {/* Menú de navegación desktop */}
        <ul className={styles.navMenu}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                onClick={() => scrollToSection(link.id)} 
                className={styles.navLink}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Zona derecha */}
        <div className={styles.rightSection}>
          
          {/* Selector de idioma */}
          <div className={styles.languageSelector}>
            <IoGlobeOutline className={styles.globeIcon} />
            
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={styles.dropdownButton}
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <span>{selectedLanguage}</span>
                <IoChevronDown 
                  className={`${styles.arrowIcon} ${isLanguageOpen ? styles.arrowRotated : ''}`} 
                />
              </button>

              {isLanguageOpen && (
                <ul className={styles.dropdownMenu}>
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      className={`${styles.dropdownItem} ${selectedLanguage === lang ? styles.dropdownItemActive : ''}`}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLanguageOpen(false);
                      }}
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Botón de login */}
          <GenericButton
            textButton="Iniciar sesión"
            type="button"
            onClick={handleLogin}
            size="none"
            variant="black"
            className={styles.loginButton}
          />
        </div>

        {/* Menú móvil toggle */}
        <button 
          type="button" 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <button 
                  onClick={() => scrollToSection(link.id)} 
                  className={styles.mobileNavLink}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          
          <div className={styles.mobileActions}>
            <GenericButton
              textButton="Iniciar sesión"
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogin();
              }}
              size="none"
              variant="black"
              className={styles.mobileLoginButton}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;