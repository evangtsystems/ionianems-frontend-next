import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import { useTranslation } from 'react-i18next';
import en from '../public/locales/en/translation.json';
import el from '../public/locales/el/translation.json';
import de from '../public/locales/de/translation.json';


import SearchBox from './SearchBox';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ locale = 'en' }) => {
  const staticTranslations = { en, el, de };
  const fallbackT = (key) => staticTranslations[locale]?.[key] || key;

  const { t: i18nT } = useTranslation();
  const t = (key) => i18nT(key) || fallbackT(key); // ✅ Prefer i18n, fallback to static

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutApiCall] = useLogoutMutation();
  const [showDropdown, setShowDropdown] = useState(false);


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let prevHeight = window.innerHeight;

    const triggerManualRepaint = () => {
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
      const evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
      document.body.dispatchEvent(evt);
    };

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      if (Math.abs(currentHeight - prevHeight) > 50) {
        requestAnimationFrame(triggerManualRepaint);
      }
      prevHeight = currentHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categoryItems = [
    { key: 'pumps', label: 'Αντλίες Σκαφών' },
    { key: 'underwater_lighting', label: 'Υποβρύχιος Φωτισμός' },
    { key: 'control_instruments', label: 'Όργανα Ελέγχου' },
    { key: 'boat_wipers', label: 'Υαλοκαθαριστήρες Σκαφών' },
    { key: 'navigation_systems', label: 'Συστήματα Πλοήγησης' },
    { key: 'alternator_regulator', label: 'Ρυθμιστής Εναλλάκτη' },
    { key: 'control_and_automation', label: 'Όργανα Ελέγχου και Αυτοματισμού' },
    { key: 'collision_prevention', label: 'Έξυπνο Σύστημα Πρόληψης Συγκρούσεων' },
    { key: 'control_systems', label: 'Συστήματα Ελέγχου' },
    { key: 'marine_electrical', label: 'Ηλεκτρολογικό Υλικό Σκαφών' },
    { key: 'electrical_equipment', label: 'Ηλεκτρικός Εξοπλισμός' },
    { key: 'battery_chargers', label: 'Φορτιστές Μπαταριών' },
    { key: 'automation_systems', label: 'Συστήματα Αυτοματισμού' },
    { key: 'marine_generator', label: 'Γεννήτρια Θαλάσσης' },
  ];

  return (
    <header
      style={{
        width: '100%',
        height: '141px',
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: 'white',
        padding: '0',
        margin: '0',
        flexWrap: 'nowrap',
        border: 'none',
        gap: 0,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div
          className="header-image"
          style={{
            backgroundImage: "url('/resized_header.webp')",
            backgroundSize: 'contain',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            flexShrink: 0,
            height: '140px',
            width: 'auto',
            cursor: 'pointer',
          }}
        />
      </Link>

      <div className="navbar-wrapper" style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', minWidth: '300px' }}>
        <Navbar expand="md" className="custom-navbar" collapseOnSelect>
          <Container className="navbar-container">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <SearchBox />
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px', transform: 'scale(0.5)' }}>
                  <LanguageSwitcher />
                </div>

                <NavDropdown
                  title={<span style={{ color: '#ffdd57' }}>{t('products')}</span>}
                  id="products-dropdown"
                  show={showDropdown}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                   {categoryItems.map(({ key }) => (
  <Link href={`/products/${key}`} passHref legacyBehavior key={key}>


    <NavDropdown.Item as="a">
      {t(key)}
    </NavDropdown.Item>
  </Link>
))}


                </NavDropdown>

                <Nav.Link as={Link} href="/our-work" style={{ color: '#ffdd57' }}>{t('Our Work')}</Nav.Link>
                <Nav.Link as={Link} href="/about" style={{ color: '#ffdd57' }}>{t('About Us')}</Nav.Link>
                <Nav.Link as={Link} href="/contact" style={{ color: '#ffdd57' }}>{t('Contact')}</Nav.Link>
                
               
               

                

{/* 
<Nav.Link as={Link} href="/cart" style={{ color: '#ffdd57' }}>
  <FaShoppingCart /> {t('cart')}  // 🏷️ Cart icon + translated "cart" label

  {cartItems.length > 0 && (       // ✅ Show badge only if the cart has items
    <Badge pill bg="success" className="ms-1">
      {cartItems.reduce((a, c) => a + c.qty, 0)}  // 🧮 Sum of item quantities in cart
    </Badge>
  )}
</Nav.Link> 
*/}
<Nav.Link as={Link} href="/boat-support" style={{ color: '#ffdd57' }}>
  ⚓ {t('boat_support')}
</Nav.Link>


                {userInfo ? (
                  <NavDropdown title={<span style={{ color: '#ffdd57' }}>{userInfo.name}</span>} id="username">
                    <NavDropdown.Item as={Link} href="/profile">{t('profile')}</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>{t('logout')}</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link as={Link} href="/login" style={{ color: '#ffdd57' }}>
                    <FaUser /> {t('sign_in')}
                  </Nav.Link>
                )}

                {userInfo?.isAdmin && (
                  <NavDropdown title={<span style={{ color: '#ffdd57' }}>{t('admin_panel')}</span>} id="adminmenu">
                    <NavDropdown.Item as={Link} href="/admin/productlist">{t('products')}</NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/admin/orderlist">{t('orders')}</NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/admin/userlist">{t('users')}</NavDropdown.Item>
                    {/* <NavDropdown.Item as={Link} href="/admin/bulk-upload">{t('bulk_upload')}</NavDropdown.Item> */}
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;