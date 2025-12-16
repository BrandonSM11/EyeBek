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


        {/* Zona derecha */}
        <div className={styles.rightSection}>
          <GenericButton
            textButton="Inicio"
            type="button"
            onClick={()=> router.push('/')}
            size="none"
            variant="black"
            className={styles.loginButton}
          />

          <GenericButton
            textButton="Contáctanos"
            type="button"
            onClick={()=> router.push('/contact')}
            size="none"
            variant="black"
            className={styles.loginButton}
          />

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
     
      
    </nav>
  );
};

export default Navbar;