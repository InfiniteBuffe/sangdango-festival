import PageTitle from '@/components/PageTitle'
import styles from '@/styles/pages/Vote/Vote.module.css'

const Vote = () => {
    return (
        <>
            <PageTitle title="투표" />
            <p className={styles.info}>
                투표는 상당고등학교 용천제에 참여 중인 여러분만 이용하실 수 있습니다.
            </p>
            <div className={styles.box}>
                <div className={styles.title}>
                    투표자 정보 입력
                </div>
                <div className={styles.description}>
                    정확한 투표 집계를 위해 필요합니다. 개인정보는 투표 종료 후 폐기됩니다.
                </div>
            </div>
        </>
    )
}

export default Vote