import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={`${styles.section} container mx-auto px-4 sm:px-6 page-vspace`}>
      <div className={styles.container}>
        <h2>404 — Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    </section>
  )
}
