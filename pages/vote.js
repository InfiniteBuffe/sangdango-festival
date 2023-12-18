import Modal from '@/components/Modal'
import PageTitle from '@/components/PageTitle'
import styles from '@/styles/pages/Vote/Vote.module.css'
import { TextField, createTheme, ThemeProvider, Button } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCircleExclamation } from "react-icons/fa6"
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MoonLoader } from 'react-spinners'
import { io } from 'socket.io-client'

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
    const router = useRouter()
    const [voteId, setVoteId] = useState()
    const [socket, setSocket] = useState(null)
    const [isCorrectVote, setIsCorrectVote] = useState(false)
    useEffect(() => {
        if (!router.isReady) return
        const vote_id = router.query.id
        if (voteId == undefined || voteId == null || voteId == '') {
            setVoteId(vote_id)
        }
        if (vote_id == null || vote_id == '' || vote_id == undefined) {
            setFormStatus({
                ...formStatus,
                studentIdForm: false, voteForm: false, loadingForm: false, infoForm: true
            })
            return
        }
        // 위에서 처리 다하고 url에서 제거
        const { pathname, query } = router
        delete query.id
        router.replace({ pathname, query })
        axios({
            method: 'POST',
            url: process.env.NEXT_PUBLIC_URL + '/api/vote/check',
            data: {
                vote_id: vote_id || '',
            },
        })
            .then(r => {
                if (r.data.active == false) {
                    setFormStatus({
                        ...formStatus,
                        studentIdForm: false, voteForm: false, loadingForm: false, infoForm: true
                    })
                    return
                }
                if (r.data.active == true) {
                    setIsCorrectVote(true)
                    setFormStatus({
                        ...formStatus,
                        studentIdForm: true, voteForm: false, loadingForm: false, infoForm: false
                    })
                    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, { transports: ['websocket'], secure: false })
                    setSocket(newSocket)
                }
            })
    }, [router.isReady])

    const [studentId, setStudentId] = useState()
    const [verifyModalStatus, setVerifyModalStatus] = useState(false)
    const [vote, setVote] = useState()
    const changeOnlyNum = (text) => {
        let regex = /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }
    const [formStatus, setFormStatus] = useState({ voteErrorForm: false, alreadyForm: false, voteSuccessForm: false, studentIdForm: false, voteForm: false, loadingForm: true, infoForm: false, endForm: false, voteLoadingForm: false, })
    const [choices, SetChoices] = useState([])
    const [question, setQuestion] = useState()
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

        // 투표 체크
        socket.emit('check vote', {
            studentId: studentId,
            id: voteId
        })
        setFormStatus({
            ...formStatus,
            studentIdForm: false,
            voteForm: false,
            loadingForm: true,
            infoForm: false,
            endForm: false,
            voteLoadingForm: false,
            voteSuccessForm: false,
            alreadyForm: false,
            voteErrorForm: false,
        })
        return
    }

    useEffect(() => {
        if (!router.isReady) return
        if (!socket) return
        socket.on('connect', () => {
            toast.success('실시간 투표 서버에 연결되었습니다.')
            socket.on('vote id error', () => {
                if (formStatus.voteLoadingForm) {
                    setFormStatus({
                        ...formStatus,
                        studentIdForm: false,
                        voteForm: false,
                        loadingForm: false,
                        infoForm: false,
                        endForm: false,
                        voteLoadingForm: false,
                        voteSuccessForm: false,
                        alreadyForm: false,
                        voteErrorForm: true,
                    })
                }
                toast.error('유효하지 않은 투표입니다.')
            })
        })
        socket.on('vote ended', (data) => {
            toast.error('투표가 마감되었습니다.')
            setFormStatus({
                ...formStatus,
                studentIdForm: false,
                voteForm: false,
                loadingForm: false,
                infoForm: false,
                endForm: true,
                voteLoadingForm: false,
                voteSuccessForm: false,
                alreadyForm: false,
                voteErrorForm: false,
            })
            return
        })
        socket.on('vote success', (data) => {
            setFormStatus({
                ...formStatus,
                studentIdForm: false,
                voteForm: false,
                loadingForm: false,
                infoForm: false,
                endForm: false,
                voteLoadingForm: false,
                voteSuccessForm: true,
                alreadyForm: false,
                voteErrorForm: false,
            })
            toast.success('투표가 완료되었습니다.')
        })
        socket.on('already vote', (data) => {
            toast.error('이미 투표하셨습니다.')
            setVote(data.vote)
            setFormStatus({
                ...formStatus,
                studentIdForm: false,
                voteForm: false,
                loadingForm: false,
                infoForm: false,
                endForm: false,
                voteLoadingForm: false,
                voteSuccessForm: false,
                alreadyForm: true,
                voteErrorForm: false,
            })
        })
        socket.on('voting data', (data) => {
            if (data.active == false) { // 유효한 투표였다가 중간에 투표가 종료됬으므로 마감 안내를 띄움
                setFormStatus({
                    ...formStatus,
                    studentIdForm: false,
                    voteForm: false,
                    loadingForm: false,
                    infoForm: false,
                    endForm: true,
                    voteLoadingForm: false,
                    voteSuccessForm: false,
                    alreadyForm: false,
                    voteErrorForm: false,
                })
                return
            }
            setQuestion(data.question)
            SetChoices(data.choices)
            setFormStatus({
                ...formStatus,
                studentIdForm: false,
                voteForm: true,
                loadingForm: false,
                infoForm: false,
                endForm: false,
                voteLoadingForm: false,
                voteSuccessForm: false,
                alreadyForm: false,
                voteErrorForm: false,
            })
        })
        socket.on('vote error', () => {
            toast.error('오류가 발생하였습니다. 다시 시도해주세요.')
            setFormStatus({
                ...formStatus,
                studentIdForm: false,
                voteForm: false,
                loadingForm: false,
                infoForm: false,
                endForm: false,
                voteLoadingForm: false,
                voteSuccessForm: false,
                alreadyForm: false,
                voteErrorForm: true,
            })
        })
        socket.on('disconnect', () => {
            if (formStatus.voteLoadingForm) {
                setFormStatus({
                    ...formStatus,
                    studentIdForm: false,
                    voteForm: false,
                    loadingForm: false,
                    infoForm: false,
                    endForm: false,
                    voteLoadingForm: false,
                    voteSuccessForm: false,
                    alreadyForm: false,
                    voteErrorForm: true,
                })
                toast.error('실시간 투표 서버와 연결이 종료되었습니다.')
                toast.error('QR코드를 통해 다시 접속해주세요.')
                return
            }
            toast.error('실시간 투표 서버와 연결이 종료되었습니다. 다시 연결중...')
        })
        socket.on('check vote', (data) => {
            setFormStatus({
                ...formStatus,
                studentIdForm: false,
                voteForm: false,
                loadingForm: false,
                infoForm: false,
                endForm: false,
                voteLoadingForm: true,
                voteSuccessForm: false,
                alreadyForm: false,
                voteErrorForm: false,
            })
            socket.emit('get voting data', voteId)
            toast.success('제한시간 내에 투표를 진행해주세요.')
            return
        })
    }, [router.isReady, socket])

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
                    value={studentId || ""}
                />
                <Button variant="contained" size="large" fullWidth onClick={clickStudentFormButton}>
                    투표 입장하기
                </Button>
            </ThemeProvider>
        </div>
    )
    const sendVote = (_studentId, _vote) => {
        setFormStatus({
            ...formStatus,
            studentIdForm: false,
            voteForm: false,
            loadingForm: false,
            infoForm: false,
            endForm: false,
            voteLoadingForm: true,
            voteSuccessForm: false,
            alreadyForm: false,
            voteErrorForm: false,
        })
        socket.emit('send vote', {
            id: voteId,
            studentId: _studentId,
            vote: _vote,
        })
    }
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
    const loadingForm = (
        <>
            <div className={styles.notice}>
                <div className={styles.icon}>
                    <MoonLoader color="#FFFFFF" speedMultiplier={'0.85'} size={50} />
                </div>
                <div className={styles.text}>
                    잠시만 기다려주세요...
                </div>
            </div>
        </>
    )
    const infoForm = (
        <>
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
    const endForm = (
        <div className={styles.notice}>
            <div className={styles.icon}>
                <IoCheckmarkCircle size='40' />
            </div>
            <div className={styles.text}>
                투표가 마감되었습니다
            </div>
        </div>
    )
    const voteLoadingForm = (
        <>
            <div className={styles.notice}>
                <div className={styles.icon}>
                    <MoonLoader color="#FFFFFF" speedMultiplier={'0.85'} size={50} />
                </div>
                <div className={styles.text}>
                    잠시만 기다려주세요...
                </div>
            </div>
        </>
    )
    const voteSuccessForm = (
        <div className={styles.notice}>
            <div className={styles.icon}>
                <IoCheckmarkCircle size='40' />
            </div>
            <div className={styles.text}>
                [{vote}] 투표 완료!
            </div>
        </div>
    )
    const voteErrorForm = (
        <div className={styles.notice}>
            <div className={styles.icon}>
                <FaCircleExclamation size='40' />
            </div>
            <div className={styles.text}>
                투표 중 오류가 발생하였습니다.
            </div>
        </div>
    )
    const alreadyForm = (
        <div className={styles.notice}>
            <div className={styles.icon}>
                <FaCircleExclamation size='40' />
            </div>
            <div className={styles.text}>
                이미 [{vote}]에 투표하셨습니다.
            </div>
        </div>
    )

    return (
        <>
            <PageTitle title="투표" />
            <p className={styles.info}>
                투표는 상당고등학교 용천제에 참여 중인 여러분만 이용하실 수 있습니다.
            </p>
            <Modal open={verifyModalStatus} cb={setVerifyModalStatus} vote={vote} studentId={studentId} confirm={sendVote} />
            {formStatus.loadingForm && (
                loadingForm
            )}
            {formStatus.voteLoadingForm && (
                voteLoadingForm
            )}
            {formStatus.infoForm && (
                infoForm
            )}
            {formStatus.studentIdForm && (
                studentForm
            )}
            {formStatus.voteForm && (
                voteForm
            )}
            {formStatus.endForm && (
                endForm
            )}
            {formStatus.voteSuccessForm && (
                voteSuccessForm
            )}
            {formStatus.voteErrorForm && (
                voteErrorForm
            )}
            {formStatus.alreadyForm && (
                alreadyForm
            )}
        </>
    )
}

// export async function getServerSideProps(context) {
//     if (!shouldRefreshData) {
//         return { props: { active: true } };
//     }

//     try {
//         const id = context.query.id;

//         if (id == null || id === '') {
//             return { props: { active: false } };
//         }

//         const res = await axios({
//             method: 'POST',
//             url: process.env.URL + '/api/vote/check',
//             data: {
//                 vote_id: id || '',
//             },
//         });

//         // 데이터를 성공적으로 가져왔을 때 shouldRefreshData를 false로 설정
//         shouldRefreshData = false;

//         return { props: { active: res.data.active } };
//     } catch (error) {
//         return { props: { active: false } };
//     }
// }

export default Vote