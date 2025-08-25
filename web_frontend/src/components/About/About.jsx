import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <h2 className={styles.heading}>About Sole X</h2>
            <p className={styles.lead}>
              We’re a sneaker care studio dedicated to bringing your pairs back to life.
              From everyday cleans to full restorations, we treat each shoe with the same
              attention to detail—so they look fresh, feel great, and last longer.
            </p>
            <p>
              Our process uses material-safe solutions and a careful, hand-finished approach.
              Whether it’s a quick refresh, a deep clean inside and out, or a targeted sole whitening,
              we tailor our work to the materials and construction of your sneakers.
            </p>
            <ul className={styles.points}>
              <li>
                <span className={styles.icon} aria-hidden="true">
                  {/* Consistent check-circle icon */}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.1 14.2-3.6-3.6 1.4-1.4 2.2 2.2 4.6-4.6 1.4 1.4-6 6z"/>
                  </svg>
                </span>
                <span>General Cleaning — everyday refresh for your rotation</span>
              </li>
              <li>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.1 14.2-3.6-3.6 1.4-1.4 2.2 2.2 4.6-4.6 1.4 1.4-6 6z"/>
                  </svg>
                </span>
                <span>Sole Whitening — removes yellowing, restores brightness</span>
              </li>
              <li>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.1 14.2-3.6-3.6 1.4-1.4 2.2 2.2 4.6-4.6 1.4 1.4-6 6z"/>
                  </svg>
                </span>
                <span>Deep Cleaning — full inside-out treatment for stubborn dirt and odors</span>
              </li>
            </ul>
            <p className={styles.note}>
              Transparent pricing, careful handling, and quick turnaround.
              Send us a message to get started or browse our services to learn more.
            </p>
          </div>
          <div className={styles.media}>
            <img
              className={styles.img}
              src="/solex-logo.png"
              alt="Sole X workshop — sneaker care and restoration"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
