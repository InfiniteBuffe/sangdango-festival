import styles from '@/styles/components/BottomNav/BottomNav.module.css'
import { useRouter } from 'next/router'
import { IoHomeOutline, IoHomeSharp, IoBookOutline, IoBookSharp, IoPaperPlaneOutline, IoPaperPlaneSharp } from 'react-icons/io5'

const BottomNav = (props) => {

    const now_tab = props.tab
    const router = useRouter()

    return (
        <>
            <div className={styles.space} />
            <div className={styles.nav}>
                <div className={styles.box}>
                    <div className={styles.menu} onClick={() => router.push('/brochure')}>
                        <div>
                            <div className={styles.icon}>
                                {(now_tab == 'brochure') ? (<IoBookSharp size={20} />) : (<IoBookOutline size={20} />)}
                            </div>
                            <div className={styles.name}>가이드북</div>
                        </div>
                    </div>
                    <div className={styles.menu} onClick={() => router.push('/')}>
                        <div>
                            <div className={styles.icon}>
                                {(now_tab == 'home') ? (<IoHomeSharp size={20} />) : (<IoHomeOutline size={20} />)}
                            </div>
                            <div className={styles.name}>홈</div>
                        </div>
                    </div>
                    <div className={styles.menu} onClick={() => router.push('/vote')}>
                        <div>
                            <div className={styles.icon}>
                                {(now_tab == 'vote') ? (<IoPaperPlaneSharp size={20} />) : (<IoPaperPlaneOutline size={20} />)}
                            </div>
                            <div className={styles.name}>투표</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomNav