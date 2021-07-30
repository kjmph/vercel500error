import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import crypto from 'crypto';

const Post = (props) => {
    const { slug, cards } = props;

    return (
        <div className={styles.container}>
            <Head>
                <title>Vercel Example 500 Error - {slug}</title>
                <meta name="description" content="Example slug that causes 500s" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to Vercel 500 errors! - {slug}
                </h1>
                <p className={styles.description}>
                    Vercel throws 500 errors in production, get started by viewing{' '}
                    <code className={styles.code}>pages/[slug].js</code>
                </p>

                <div className={styles.grid}>
                    {cards.map(card =>
                        <a key={card.destination} href={`/${card.destination}`} className={styles.card}>
                            <h2>{card.title} &rarr;</h2>
                            <p>{card.content}</p>
                        </a>)}
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { slug = '' } = context.params;

    const cards = [...Array(5000)].map(c => {
        const id = crypto.randomBytes(9).toString('hex');
        return {
            destination: id,
            title: `Go visit ${id}`,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id nisi et felis pulvinar laoreet a sed orci.',
        };
    });

    return { props: { slug, cards } };
}

export default Post;
