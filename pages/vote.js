import Modal from '@/components/Modal'
import PageTitle from '@/components/PageTitle'
import styles from '@/styles/pages/Vote/Vote.module.css'
import { TextField, createTheme, ThemeProvider, Button } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCircleExclamation } from "react-icons/fa6"

const Vote = (props) => {
    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        marginTop: '25px',
                        backgroundColor: '#357a38',
                        fontFamily: 'pretendard',
                        fontWeight: '500',
                        '&:hover': {
                            backgroundColor: '#357a38',
                        },
                    }
                }
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        fontFamily: 'pretendard',
                        fontWeight: '500'
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        "&.Mui-focused": {
                            color: "white"
                        },
                        "&.MuiInputLabel-outlined": {
                            color: "white"
                        },
                        fontFamily: 'pretendard',
                        fontWeight: '500'
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                    },
                    input: {
                        fontFamily: 'pretendard',
                        fontWeight: '500',
                        color: 'white'
                    }
                }
            }
        }
    })
    const [studentId, setStudentId] = useState()
    const [verifyModalStatus, setVerifyModalStatus] = useState(false)
    const [vote, setVote] = useState()
    const changeOnlyNum = (text) => {
        let regex = /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }
    const [formStatus, setFormStatus] = useState({ studentIdForm: true, voteForm: false })
    const [choices, SetChoices] = useState(['일번', '이번', '삼번'])
    const [question, setQuestion] = useState()
    const router = useRouter()
    const clickStudentFormButton = () => {
        // 5글자 필수
        if (studentId == undefined || studentId == null || studentId == '') {
            toast.error('올바르지 않는 학번입니다.')
            return
        }
        if ((studentId.length) != 5) {
            toast.error('올바르지 않는 학번입니다.')
            return
        }
        // 학년 필터링
        if (!['1', '2', '3'].includes(studentId.charAt(0))) {
            toast.error('올바르지 않는 학번입니다.')
            return
        }
        // 번호 필터링 (각 반마다 마지막 학생의 번호가 35번은 절대 넘을 수 없다는 가정을 세움)
        if ((studentId.charAt(3) == 3 && studentId.charAt(4) > 5) || (studentId.charAt(3) > 3)) {
            toast.error('올바르지 않는 학번입니다.') // 36번부터 막음
            return
        }
        // 반 필터링
        if (studentId.charAt(1) != 0) { // 2023학년도 기준 모든 학년이 9반까지 존재함.
            toast.error('올바르지 않는 학번입니다.')
            return
        }

        setFormStatus({
            ...formStatus,
            studentIdForm: false,
            voteForm: true
        })
        toast.success('제한시간 내에 투표를 진행해주세요.')
    }

    const studentForm = (
        <div className={styles.box}>
            <div className={styles.title}>
                투표자 정보 입력 📋
            </div>
            <div className={styles.description}>
                정확한 투표 집계를 위해 필요합니다. 1인 1표를 따르며, 다른 사람의 학번을 도용하는 경우가 적발 될 시 참여가 제한됩니다.
            </div>
            <ThemeProvider theme={theme}>
                <TextField
                    helperText="예) 3학년 3반 15번 → 30315"
                    style={{ width: '100%', marginTop: '25px' }}
                    fullWidth
                    label="학번"
                    variant="outlined"
                    color="primary"
                    onChange={(a) => {
                        if ((a.target.value).length > 5) {
                            return
                        }
                        setStudentId(changeOnlyNum(a.target.value))
                    }}
                    value={studentId}
                />
                <Button variant="contained" size="large" fullWidth onClick={clickStudentFormButton}>
                    투표 입장하기
                </Button>
            </ThemeProvider>
        </div>
    )
    const voteForm = (
        <>
            <div className={styles.question}>
                Q. {question}
            </div>
            {
                choices.map((k, key) => {
                    return (
                        <div key={key} className={styles.answer} onClick={() => {
                            setVote(k)
                            setVerifyModalStatus(true)
                        }}>
                            <div className={styles.answer_text}>
                                {k}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

    if (!props.active) {
        return (
            <>
                <PageTitle title="투표" />
                <p className={styles.info}>
                    투표는 상당고등학교 용천제에 참여 중인 여러분만 이용하실 수 있습니다.
                </p>
                <div className={styles.notice}>
                    <div className={styles.icon}>
                        <FaCircleExclamation size='40' />
                    </div>
                    <div className={styles.text}>
                        실시간 방송 화면을 통해<br />투표 참여가 가능합니다
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Modal open={verifyModalStatus} cb={setVerifyModalStatus} vote={vote} />
            <PageTitle title="투표" />
            <p className={styles.info}>
                투표는 상당고등학교 용천제에 참여 중인 여러분만 이용하실 수 있습니다.
            </p>
            {formStatus.studentIdForm && (
                studentForm
            )}
            {formStatus.voteForm && (
                voteForm
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        if (context.query.id == null || context.query.id == '') {
            return { props: { active: false } }
        }
        const res = await axios({
            method: 'POST',
            url: process.env.URL + '/api/vote/check',
            data: {
                vote_id: context.query.id || ''
            }
        })
        return { props: { active: res.data.active } }
    } catch (error) {
        return { props: { active: false } }
    }
}
export default Vote