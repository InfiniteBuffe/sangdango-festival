import styles from '@/styles/components/BottomNav/BottomNav.module.css'
import { IoHomeOutline, IoHomeSharp, IoBookOutline, IoBookSharp, IoPaperPlaneOutline, IoPaperPlaneSharp } from 'react-icons/io5'

const BottomNav = (props) => {

    const now_tab = props.tab

    return (
        <>
            <div className={styles.nav}>
                <div className={styles.box}>
                    <div className={styles.menu}>
                        <div className={styles.icon}>
                            {(now_tab == 'brochure') ? (<IoBookSharp size={25} />) : (<IoBookOutline size={25} />)}
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <div className={styles.icon}>
                            {(now_tab == 'home') ? (<IoHomeSharp size={25} />) : (<IoHomeOutline size={25} />)}
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <div className={styles.icon}>
                            {(now_tab == 'vote') ? (<IoPaperPlaneSharp size={25} />) : (<IoPaperPlaneOutline size={25} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomNav