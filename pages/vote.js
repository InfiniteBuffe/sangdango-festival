import PageTitle from '@/components/PageTitle'
import styles from '@/styles/pages/Vote/Vote.module.css'
import { TextField, createTheme, ThemeProvider, Button } from '@mui/material'
import { useState } from 'react'

const Vote = () => {
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
    const changeOnlyNum = (text) => {
        let regex = /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }
    return (
        <>
            <PageTitle title="투표" />
            <p className={styles.info}>
                투표는 상당고등학교 용천제에 참여 중인 여러분만 이용하실 수 있습니다.
            </p>
            {/* <div className={styles.box}>
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
                            if((a.target.value).length > 5) {
                                return
                            }
                            setStudentId(changeOnlyNum(a.target.value))
                        }}
                        value={studentId}
                    />
                    <Button variant="contained" size="large" fullWidth>
                        투표 입장하기
                    </Button>
                </ThemeProvider>
            </div> */}
        </>
    )
}

export default Vote