import styles from '@/styles/components/BoxButton/BoxButton.module.css'

const BoxButton = (props) => {
    // 색상 받아와서 props로, 여기에 적용하는거 만들기
    const color = { blue: styles.blue }
    return (
        <>
            <div className={styles.button} id={color[props.color]}>
                <div className={styles.text}>
                    {props.text}
                </div>
            </div>
        </>
    )
}

export default BoxButton