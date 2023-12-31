import styles from '@/styles/components/Modal/Modal.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

const Modal = ({ open, cb, vote, studentId, confirm }) => {

    const [className, setClassName] = useState({ container: styles.none, box: styles.none })

    useEffect(() => {
        if (open) {
            setClassName({ container: styles.container, box: styles.box })
        }
    }, [open])

    const closeModal = () => {
        cb(false)
        setClassName({ container: styles.close_container, box: styles.close_box })
    }

    return (
        <>
            <div className={classNames(className.container)}>
                <div className={classNames(className.box)}>
                    <div className={styles.title}>
                        투표 확인
                    </div>
                    <div className={styles.title_info}>
                        내용을 확인하시고 투표를 전송해주세요.
                    </div>
                    <div className={styles.space} />
                    {/* <div className={styles.alert}>
                        투표 전송 후 변경이 불가능합니다.
                    </div> */}
                    <div className={styles.text}>
                        <span style={{fontWeight:'400'}}>학번:</span> {studentId}<br />
                        <span style={{fontWeight:'400'}}>선택:</span> {vote}
                    </div>
                    <div className={styles.space} />

                    <div className={styles.button_box}>
                        <div
                            className={styles.button}
                            onClick={() => {
                                closeModal()
                                confirm(studentId, vote)
                            }}
                            id={styles.send}
                        >
                            투표 전송
                        </div>
                        <div className={styles.space_flex} />
                        <div
                            className={styles.button}
                            onClick={() => closeModal()}
                            id={styles.close}
                        >
                            다시 선택
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal