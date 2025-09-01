import styles from './SoleXLogo.module.css'

export default function SoleXLogo({ className = '', variant = 'default' }) {
    const isCompact = variant === 'compact'
    return (
        <div
            className={`${styles.logo} ${isCompact ? styles.compact : ''} ${className}`.trim()}
            role="img"
            aria-label="Sole X logo"
        >
            <div className={styles.letters} aria-hidden>
                <span className={styles.letter}>S</span>
                <span className={styles.letter}>O</span>
                <span className={styles.letter}>L</span>
                <span className={styles.letter}>E</span>
            </div>
            <div className={styles.icon} aria-hidden>
                <span className={styles.x}>X</span>
            </div>
        </div>
    )
}
