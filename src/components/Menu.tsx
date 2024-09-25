// components/Menu.js
// import Link from 'next/link';
// import menuData from '../data/menu.json';

const Menu = () => {
    return (
        <nav>
            <ul>
                {/* {menuData.map(item => (
                    <li key={item.id}>
                        <Link href={item.link}>
                            <a>{item.name}</a>
                        </Link>
                    </li>
                ))} */}
            </ul>
        </nav>
    );
};

export default Menu;
