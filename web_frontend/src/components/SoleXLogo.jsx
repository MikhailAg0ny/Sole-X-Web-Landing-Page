import styles from './SoleXLogo.module.css'

export default function SoleXLogo({ className = '' }) {
	return (
		<div className={`${styles.logo} ${className}`.trim()} role="img" aria-label="Sole X logo">
			<div className={styles.word}>SOLE</div>
			<div className={styles.icon} aria-hidden>
				<span className={styles.x}>X</span>
			</div>
		</div>
	)
}

