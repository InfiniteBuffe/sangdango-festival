import styles from '@/styles/components/TopSlideBanner/TopSlideBanner.module.css'
import Marquee from "react-fast-marquee";

const TopSlideBanner = (props) => {
    return (
        <>
            <div className={styles.banner}>
                <Marquee
                    autoFill={true}
                    pauseOnHover={true}
                >
                    <div className={styles.text}>
                        <p>SANGDANG YONG-CHEON FESTIVAL 🎉</p>
                    </div>
                </Marquee>
            </div>
        </>
    )
}

export default TopSlideBanner