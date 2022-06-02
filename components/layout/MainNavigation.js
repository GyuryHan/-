import Link from 'next/link';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>생각 모으기</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>생각 목록</Link>
          </li>
          <li>
            <Link href='/new-meetup'>생각 생성</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
