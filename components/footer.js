import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <div>
            <h1>Hello</h1>
            <Link href='/'>
                <a>
                    <Image
                    src='/images/home-alt.svg'
                    className=''
                    alt='Home'
                    width={24}
                    height={24}
                    />
                </a>
            </Link>
            <Link href='/chat'>
            <a>
                    <Image
                    src='/images/chat.svg'
                    className=''
                    alt='Chat'
                    width={24}
                    height={24}
                    />
                </a>
            </Link>
            <Link href='/profile'>
            <a>
                    <Image
                    src='/images/user.svg'
                    className=''
                    alt='Profile'
                    width={24}
                    height={24}
                    />
                </a>
            </Link>
            <Link href='/settings'>
            <a>
                    <Image
                    src='/images/settings.svg'
                    className=''
                    alt='Settings'
                    width={24}
                    height={24}
                    />
                </a>
            </Link>
        </div>
    )
}