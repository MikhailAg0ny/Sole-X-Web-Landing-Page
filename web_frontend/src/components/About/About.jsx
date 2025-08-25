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
                  {/* Brush / clean icon */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M7 16c0-1.657 1.343-3 3-3h3l7-7-3-3-7 7v3c0 1.657-1.343 3-3 3H7zM5 19a3 3 0 0 0 3 3h6a1 1 0 1 0 0-2H8a1 1 0 0 1-1-1 1 1 0 1 0-2 0z"/>
                  </svg>
                </span>
                <span>General Cleaning — everyday refresh for your rotation</span>
              </li>
              <li>
                <span className={styles.icon} aria-hidden="true">
                  {/* Sparkle / whitening icon */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2zm6 10l1.5 3.5L23 17l-3.5 1.5L18 22l-1.5-3.5L13 17l3.5-1.5L18 12z"/>
                  </svg>
                </span>
                <span>Sole Whitening — removes yellowing, restores brightness</span>
              </li>
              <li>
                <span className={styles.icon} aria-hidden="true">
                  {/* Shield / deep clean icon */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2l8 4v6c0 5-3.5 9.74-8 10-4.5-.26-8-5-8-10V6l8-4zm0 4.5L7 8v4c0 3.7 2.6 7.2 5 7.4 2.4-.2 5-3.7 5-7.4V8l-5-1.5z"/>
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
