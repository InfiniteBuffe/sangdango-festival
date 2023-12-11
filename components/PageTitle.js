import styles from '@/styles/components/PageTitle/PageTitle.module.css'

const PageTitle = (props) => {
    return (
        <>
            <div className={styles.box}>
                <div className={styles.text}>
                    {props.title}
                </div>
            </div>
        </>
    )
}

export default PageTitle