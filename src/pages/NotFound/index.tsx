import { Link } from 'react-router-dom';

import './styles.scss';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

export default function NotFoundPage() {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-container__title'>404 ERROR</h1>
      <p className='not-found-container__info'>This page not found. Back to home and start again</p>
      <Link to={ROUTES.home}>
        <Button className='not-found-container__button'>Home</Button>
      </Link>
    </div>
  );
}
