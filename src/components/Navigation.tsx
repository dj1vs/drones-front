import { FC } from 'react';
import { useSelector } from 'react-redux';
import store from '../store/store'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

import { logoutUser } from '../modules/authActions';
import { useAppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';

const Navigation: FC = () => {
  const {userToken, userName} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const sendLogout = async() => {
    if (userToken != null) {
        dispatch(logoutUser(userToken))
        navigate('/drones-front/')
    }
}

  return (
    <Navbar bg="secondary" expand="lg" color='grey'>
      <Container>
        <Nav.Link href="/drones-front/">Районы</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userToken &&
            <Nav className="me-auto">
              <Nav.Link href="/drones-front/flights">Полёты</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
      {userToken &&
        <Navbar.Collapse className='justify-content-end'>
          <Nav.Link href="/drones-front/book">Корзина</Nav.Link>
          <Nav.Item style={{marginLeft: '10px', marginRight: '10px', width: '170px'}}>Пользователь: {userName}</Nav.Item>
          <Button onClick={sendLogout}>Выход</Button>
        </Navbar.Collapse>
      }
      {!userToken &&
          <Navbar.Collapse className='justify-content-end'>
            <Nav.Link href="/drones-front/auth" style={{marginRight: '20px'}}>Вход</Nav.Link>
            <Nav.Link href="/drones-front/auth" style={{marginRight: '20px'}}>Регистрация</Nav.Link>
            
            
          </Navbar.Collapse>
            }
    </Navbar>
  );
}

export default Navigation;
