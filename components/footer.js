import Image from 'next/image'
import Link from 'next/link'
import styles from "../styles/Home.module.css";
export default function Footer() {
    return (
        <div className={styles.footer}>
            <h1>Hello</h1>
            <Link href='/'>
                <a>
                    <button>BACK</button>
                </a>
            </Link>
            <Link href='/chat'>
            <a>
                   <button> NEXT</button>
                </a>
            </Link>
           
        </div>
    )
}