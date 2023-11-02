import styles from '@/styles/components/Box/Box.module.css'
const Box = (props) => {
    return (
        <>
            <div className={styles.box}>
                {props.children}
            </div>
        </>
    )
}

export default Box