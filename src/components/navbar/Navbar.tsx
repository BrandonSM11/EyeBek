"use client"
import React, { useState } from 'react';
import Image from 'next/image'; 
import { IoMenu, IoClose } from 'react-icons/io5';
import GenericButton from '@/components/GenericButton/GenericButton';
import styles from './Navbar.module.css';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onLogin?: () => void;
}

const Navbar = ({ onLogin }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Contáctanos', href: '#contacto' },
  ];

  const loginView = () => {
    router.push('/login');
    setIsMobileMenuOpen(false);
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        {/* Logo */}
        <div className={styles.logoImage}>
          <Image 
            src={logo} 
            alt="EyeBek Logo" 
            width={60} 
            height={60} 
            className={styles.logoImage} 
          />
        </div>

        {/* Menú de navegación - Desktop */}
        <ul className={styles.navMenu}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className={styles.navLink}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Zona derecha - Desktop */}
        <div className={styles.rightSection}>
          <GenericButton
            textButton="Iniciar sesión"
            type="button"
            onClick={loginView}
            size="none"
            variant="black"
            className={styles.loginButton}
          />
        </div>

        {/* Menú móvil - Botón hamburguesa */}
        <button 
          type="button" 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú"
        >
          {isMobileMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Menú móvil - Contenido */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavMenu}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={styles.mobileNavLink}
                  onClick={handleNavClick}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileButtonContainer}>
            <GenericButton
              textButton="Iniciar sesión"
              type="button"
              onClick={loginView}
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